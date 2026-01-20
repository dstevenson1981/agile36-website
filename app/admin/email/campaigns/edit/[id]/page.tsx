'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Contact {
  id: number;
  email: string;
  first_name: string | null;
  last_name: string | null;
  tags: string[] | null;
  subscribed: boolean;
  blocked: boolean | null;
}

interface Campaign {
  id: number;
  name: string;
  subject: string;
  html_content: string;
  text_content: string | null;
  status: string;
}

export default function CampaignEditorPage() {
  const router = useRouter();
  const params = useParams();
  const campaignId = params?.id ? parseInt(params.id as string) : null;

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [campaignName, setCampaignName] = useState('');
  const [campaignSubject, setCampaignSubject] = useState('');
  const [campaignHtml, setCampaignHtml] = useState('');
  const [campaignText, setCampaignText] = useState('');

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContactIds, setSelectedContactIds] = useState<number[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubscribed, setFilterSubscribed] = useState<boolean | null>(true);
  const [showBlockedOnly, setShowBlockedOnly] = useState(false);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (campaignId) {
      fetchCampaign();
      fetchAllTags();
      fetchContacts();
      fetchRecipients();
    }
  }, [campaignId]);

  useEffect(() => {
    if (campaignId) {
      fetchContacts();
    }
  }, [selectedTags, filterSubscribed, searchTerm, showBlockedOnly]);

  const fetchCampaign = async () => {
    if (!campaignId) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/email/campaigns/${campaignId}`);
      const data = await response.json();
      if (data.success && data.campaign) {
        setCampaign(data.campaign);
        setCampaignName(data.campaign.name);
        setCampaignSubject(data.campaign.subject);
        setCampaignHtml(data.campaign.html_content || '');
        setCampaignText(data.campaign.text_content || '');
      } else {
        alert(data.error || 'Failed to fetch campaign');
        router.push('/admin/email');
      }
    } catch (error) {
      alert('Error fetching campaign');
      router.push('/admin/email');
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipients = async () => {
    if (!campaignId) return;

    try {
      const response = await fetch(`/api/email/campaigns/${campaignId}/recipients`);
      const data = await response.json();
      if (data.success) {
        setSelectedContactIds(data.contactIds || []);
      }
    } catch (error) {
      console.error('Error fetching recipients:', error);
    }
  };

  const fetchAllTags = async () => {
    try {
      const response = await fetch('/api/email/tags');
      const data = await response.json();
      if (data.success && data.tags) {
        setAllTags(data.tags);
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const fetchContacts = async () => {
    if (!campaignId) return;

    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedTags.length > 0) {
        params.append('tags', selectedTags.join(','));
      }
      if (filterSubscribed !== null) {
        params.append('subscribed', filterSubscribed.toString());
      }
      if (searchTerm) {
        params.append('search', searchTerm);
      }
      if (showBlockedOnly) {
        params.append('blocked', 'true');
      }
      params.append('limit', '1000');

      const response = await fetch(`/api/email/contacts?${params.toString()}`);
      const data = await response.json();
      if (data.success) {
        setContacts(data.contacts || []);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleContactSelection = (contactId: number) => {
    setSelectedContactIds(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const toggleSelectAll = () => {
    const filteredContacts = contacts.filter(c => !c.blocked && c.subscribed);
    if (selectedContactIds.length === filteredContacts.length) {
      setSelectedContactIds([]);
    } else {
      setSelectedContactIds(filteredContacts.map(c => c.id));
    }
  };

  const handleSaveRecipients = async () => {
    if (!campaignId) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/email/campaigns/${campaignId}/recipients`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contactIds: selectedContactIds }),
      });
      const data = await response.json();
      if (data.success) {
        alert(`Recipients saved: ${selectedContactIds.length} contacts selected`);
      } else {
        alert(data.error || 'Failed to save recipients');
      }
    } catch (error) {
      alert('Error saving recipients');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveCampaign = async (asDraft = true) => {
    if (!campaignId) return;

    if (!campaignName || !campaignSubject || !campaignHtml) {
      alert('Please fill in all required fields');
      return;
    }

    setSaving(true);
    try {
      // Save campaign details
      const campaignResponse = await fetch(`/api/email/campaigns/${campaignId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: campaignName,
          subject: campaignSubject,
          html_content: campaignHtml,
          text_content: campaignText,
          status: asDraft ? 'draft' : 'scheduled',
        }),
      });

      const campaignData = await campaignResponse.json();
      if (!campaignData.success) {
        throw new Error(campaignData.error || 'Failed to save campaign');
      }

      // Save recipients
      const recipientsResponse = await fetch(`/api/email/campaigns/${campaignId}/recipients`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contactIds: selectedContactIds }),
      });

      const recipientsData = await recipientsResponse.json();
      if (!recipientsData.success) {
        throw new Error(recipientsData.error || 'Failed to save recipients');
      }

      if (!asDraft) {
        // Send campaign
        const sendResponse = await fetch('/api/email/send-campaign', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            campaignId,
            sendImmediately: true,
          }),
        });

        const sendData = await sendResponse.json();
        if (!sendData.success) {
          throw new Error(sendData.error || 'Failed to send campaign');
        }

        alert(`Campaign sent! ${sendData.sent || selectedContactIds.length} emails sent successfully.`);
      } else {
        alert('Campaign saved as draft');
      }

      router.push('/admin/email?tab=campaigns');
    } catch (error: any) {
      alert(error.message || 'Error saving campaign');
    } finally {
      setSaving(false);
    }
  };

  const handleSendNow = async () => {
    if (selectedContactIds.length === 0) {
      alert('Please select at least one recipient');
      return;
    }

    if (!confirm(`Send campaign to ${selectedContactIds.length} contact(s)? This cannot be undone.`)) {
      return;
    }

    setSending(true);
    try {
      await handleSaveCampaign(false);
    } finally {
      setSending(false);
    }
  };

  if (loading && !campaign) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-8">Loading campaign...</div>
        </div>
      </div>
    );
  }

  const filteredContacts = contacts.filter(c => !c.blocked && c.subscribed);
  const selectedCount = selectedContactIds.length;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Campaign</h1>
          <p className="text-gray-600">Edit campaign details and select recipients</p>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8 mb-24">
          {/* Left Column: Campaign Details */}
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-3">Campaign Details</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Name *
                </label>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g., Monthly Newsletter - January 2026"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject Line *
                </label>
                <input
                  type="text"
                  value={campaignSubject}
                  onChange={(e) => setCampaignSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Email subject line"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Email Content (HTML) *
                </label>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-2 font-medium">Edit HTML:</p>
                    <textarea
                      value={campaignHtml}
                      onChange={(e) => setCampaignHtml(e.target.value)}
                      rows={10}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm resize-y"
                      placeholder="<html><body><h1>Your email content here</h1></body></html>"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-2 font-medium">Preview:</p>
                    <div className="border border-gray-300 rounded-md bg-white p-4 max-h-[300px] overflow-y-auto">
                      <div
                        className="max-w-full overflow-x-auto"
                        style={{ transform: 'scale(0.9)', transformOrigin: 'top left' }}
                        dangerouslySetInnerHTML={{ __html: campaignHtml || '<p class="text-gray-400 text-center py-8">Preview will appear here</p>' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plain Text Version (optional)
                </label>
                <textarea
                  value={campaignText}
                  onChange={(e) => setCampaignText(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Plain text version for email clients that don't support HTML"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Recipient Selection */}
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-3">Select Recipients</h2>

            {/* Filters */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by email or name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-md min-h-[60px] max-h-[120px] overflow-y-auto">
                  {allTags.length > 0 ? (
                    allTags.map(tag => {
                      const isSelected = selectedTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setSelectedTags(prev => prev.filter(t => t !== tag));
                            } else {
                              setSelectedTags(prev => [...prev, tag]);
                            }
                          }}
                          className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                            isSelected
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    })
                  ) : (
                    <span className="text-sm text-gray-500">No tags available</span>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subscription</label>
                  <select
                    value={filterSubscribed === null ? 'all' : filterSubscribed.toString()}
                    onChange={(e) => setFilterSubscribed(e.target.value === 'all' ? null : e.target.value === 'true')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="all">All</option>
                    <option value="true">Subscribed</option>
                    <option value="false">Unsubscribed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Selected Count */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">
                  {selectedCount} contact{selectedCount !== 1 ? 's' : ''} selected
                </span>
                <button
                  onClick={toggleSelectAll}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 underline"
                >
                  {selectedCount === filteredContacts.length && filteredContacts.length > 0 ? 'Deselect All' : 'Select All'}
                </button>
              </div>
            </div>

            {/* Contact List */}
            <div className="border border-gray-300 rounded-md overflow-hidden">
              <div className="max-h-[500px] overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      <input
                        type="checkbox"
                        checked={selectedCount === filteredContacts.length && filteredContacts.length > 0}
                        onChange={toggleSelectAll}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tags</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredContacts.map((contact) => (
                    <tr
                      key={contact.id}
                      className={selectedContactIds.includes(contact.id) ? 'bg-blue-50' : ''}
                    >
                      <td className="px-4 py-2">
                        <input
                          type="checkbox"
                          checked={selectedContactIds.includes(contact.id)}
                          onChange={() => toggleContactSelection(contact.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">{contact.email}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">
                        {contact.first_name} {contact.last_name}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-500">
                        <div className="flex flex-wrap gap-1">
                          {contact.tags?.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                          {contact.tags && contact.tags.length > 3 && (
                            <span className="text-xs text-gray-500">+{contact.tags.length - 3}</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              {filteredContacts.length === 0 && (
                <div className="text-center py-8 text-gray-500">No contacts found</div>
              )}
              {filteredContacts.length > 0 && (
                <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-600 text-center">
                  Showing {filteredContacts.length} contact{filteredContacts.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer with Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              onClick={() => router.push('/admin/email?tab=campaigns')}
              className="px-6 py-2.5 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-center"
            >
              Cancel
            </button>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleSaveCampaign(true)}
                disabled={saving}
                className="px-6 py-2.5 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-center"
              >
                {saving ? 'Saving...' : 'Save as Draft'}
              </button>
              <button
                onClick={handleSendNow}
                disabled={sending || selectedCount === 0}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-center"
              >
                {sending ? 'Sending...' : `Send Now (${selectedCount})`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
