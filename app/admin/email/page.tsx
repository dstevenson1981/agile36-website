'use client';

import { useState, useEffect } from 'react';

interface Contact {
  id: number;
  email: string;
  first_name: string | null;
  last_name: string | null;
  role: string | null;
  company: string | null;
  tags: string[] | null;
  subscribed: boolean;
  blocked: boolean | null;
  blocked_at: string | null;
  blocked_reason: string | null;
  created_at: string;
}

interface Campaign {
  id: number;
  name: string;
  subject: string;
  html_content: string;
  text_content: string | null;
  status: string;
  sent_count: number;
  created_at: string;
  sent_at: string | null;
}

type Tab = 'contacts' | 'compose' | 'campaigns' | 'analytics';

export default function EmailAdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('contacts');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [totalContactCount, setTotalContactCount] = useState<number>(0);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [filterSubscribed, setFilterSubscribed] = useState<boolean | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('');
  const [filterCompany, setFilterCompany] = useState<string>('');
  const [filterDateRange, setFilterDateRange] = useState<string>('all');
  const [allRoles, setAllRoles] = useState<string[]>([]);
  const [allCompanies, setAllCompanies] = useState<string[]>([]);
  const [bulkTagInput, setBulkTagInput] = useState('');
  const [bulkTagging, setBulkTagging] = useState(false);
  const [taggingRecent, setTaggingRecent] = useState(false);

  // Campaign composer state
  const [campaignName, setCampaignName] = useState('');
  const [campaignSubject, setCampaignSubject] = useState('');
  const [campaignHtml, setCampaignHtml] = useState('');
  const [campaignText, setCampaignText] = useState('');
  const [selectedContactTags, setSelectedContactTags] = useState<string[]>([]);
  const [campaignTagsToAdd, setCampaignTagsToAdd] = useState<string>('');
  const [sendToAll, setSendToAll] = useState(false);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [recipientCount, setRecipientCount] = useState<number | null>(null);
  const [loadingRecipients, setLoadingRecipients] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [editTags, setEditTags] = useState<string>('');

  // Analytics state
  const [analytics, setAnalytics] = useState<any>(null);
  
  // Blocked contacts state
  const [showBlockedOnly, setShowBlockedOnly] = useState(false);

  // Fetch all tags once when component mounts or when contacts tab is active
  useEffect(() => {
    if (activeTab === 'contacts' || activeTab === 'compose') {
      fetchAllTags(); // Fetch all tags - this should only run once or when tab changes
    }
  }, [activeTab]);

  // Fetch contacts when tab changes
  useEffect(() => {
    if (activeTab === 'contacts') {
      fetchContacts();
    } else if (activeTab === 'campaigns') {
      fetchCampaigns();
    } else if (activeTab === 'analytics') {
      fetchAnalytics();
    }
  }, [activeTab]);

  // Fetch contacts when filters change (but don't refetch tags)
  useEffect(() => {
    if (activeTab === 'contacts') {
      fetchContacts();
    }
  }, [selectedTags, filterSubscribed, searchTerm, showBlockedOnly, filterRole, filterCompany, filterDateRange]);

  // Fetch all roles and companies when contacts tab is active
  useEffect(() => {
    if (activeTab === 'contacts') {
      fetchAllRolesAndCompanies();
    }
  }, [activeTab]);

  const fetchAllTags = async () => {
    try {
      console.log('Fetching all tags...');
      // Use the contact-options endpoint which fetches ALL tags from ALL contacts
      const response = await fetch('/api/email/contact-options');
      const data = await response.json();
      
      console.log('Tags API response:', data);
      
      if (data.success && data.tags) {
        setAllTags(data.tags);
        console.log('All tags found:', data.tags.length, 'tags');
      } else {
        // Fallback to old method if new endpoint doesn't have tags yet
        const fallbackResponse = await fetch('/api/email/contacts');
        const fallbackData = await fallbackResponse.json();
        
        if (fallbackData.success && fallbackData.contacts && Array.isArray(fallbackData.contacts)) {
          const tags = new Set<string>();
          fallbackData.contacts.forEach((contact: Contact) => {
            if (contact.tags && Array.isArray(contact.tags)) {
              contact.tags.forEach(tag => {
                if (tag && typeof tag === 'string' && tag.trim()) {
                  tags.add(tag.trim());
                }
              });
            }
          });
          setAllTags(Array.from(tags).sort());
        }
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };
  
  const fetchRecipientCount = async () => {
    if (sendToAll) {
      setLoadingRecipients(true);
      try {
        const response = await fetch('/api/email/contacts?subscribed=true&blocked=false');
        const data = await response.json();
        if (data.success) {
          setRecipientCount(data.totalCount || data.contacts?.length || 0);
        }
      } catch (error) {
        console.error('Error fetching recipient count:', error);
      } finally {
        setLoadingRecipients(false);
      }
    } else if (selectedContactTags.length > 0) {
      setLoadingRecipients(true);
      try {
        const params = new URLSearchParams();
        params.append('tags', selectedContactTags.join(','));
        params.append('subscribed', 'true');
        params.append('blocked', 'false');
        const response = await fetch(`/api/email/contacts?${params.toString()}`);
        const data = await response.json();
        if (data.success) {
          setRecipientCount(data.totalCount || data.contacts?.length || 0);
        }
      } catch (error) {
        console.error('Error fetching recipient count:', error);
      } finally {
        setLoadingRecipients(false);
      }
    } else {
      setRecipientCount(null);
    }
  };
  
  // Fetch recipient count when selection changes
  useEffect(() => {
    if (activeTab === 'compose') {
      fetchRecipientCount();
    }
  }, [sendToAll, selectedContactTags, activeTab]);

  const fetchAllRolesAndCompanies = async () => {
    try {
      const response = await fetch('/api/email/contact-options');
      const data = await response.json();
      
      if (data.success) {
        setAllRoles(data.roles || []);
        setAllCompanies(data.companies || []);
        // Also update tags if available
        if (data.tags) {
          setAllTags(data.tags);
        }
      }
    } catch (error) {
      console.error('Error fetching roles and companies:', error);
    }
  };

  const fetchContacts = async () => {
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
      if (filterRole) {
        params.append('role', filterRole);
      }
      if (filterCompany) {
        params.append('company', filterCompany);
      }
      if (filterDateRange && filterDateRange !== 'all') {
        params.append('dateRange', filterDateRange);
      }

      const response = await fetch(`/api/email/contacts?${params.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        setContacts(data.contacts);
        setTotalContactCount(data.totalCount || data.contacts?.length || 0);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/email/campaigns');
      const data = await response.json();
      if (data.success) {
        setCampaigns(data.campaigns);
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/email/analytics');
      const data = await response.json();
      if (data.success) {
        setAnalytics(data.analytics);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const role = formData.get('role') as string;
    const company = formData.get('company') as string;
    const tagsInput = formData.get('tags') as string;
    const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(t => t) : [];

    setLoading(true);
    try {
      const response = await fetch('/api/email/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          first_name: firstName, 
          last_name: lastName, 
          role: role || null,
          company: company || null,
          tags 
        }),
      });
      const data = await response.json();
      if (data.success) {
        fetchAllTags(); // Refresh tags list
        fetchContacts();
        (e.target as HTMLFormElement).reset();
      } else {
        alert(data.error || 'Failed to add contact');
      }
    } catch (error) {
      alert('Error adding contact');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteContact = async (id: number) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/email/contacts/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        fetchContacts();
      } else {
        alert(data.error || 'Failed to delete contact');
      }
    } catch (error) {
      alert('Error deleting contact');
    } finally {
      setLoading(false);
    }
  };

  const handleBlockContact = async (id: number, email: string) => {
    if (!confirm(`Mark ${email} as blocked/spam? They will be automatically excluded from future campaigns.`)) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/email/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blocked: true,
          subscribed: false,
          blocked_reason: 'Manually marked as blocked/spam'
        }),
      });
      const data = await response.json();
      if (data.success) {
        fetchContacts();
      } else {
        alert(data.error || 'Failed to block contact');
      }
    } catch (error) {
      alert('Error blocking contact');
    } finally {
      setLoading(false);
    }
  };

  const handleUnblockContact = async (id: number, email: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/email/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blocked: false,
          blocked_reason: null
        }),
      });
      const data = await response.json();
      if (data.success) {
        fetchContacts();
      } else {
        alert(data.error || 'Failed to unblock contact');
      }
    } catch (error) {
      alert('Error unblocking contact');
    } finally {
      setLoading(false);
    }
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setEditTags(contact.tags?.join(', ') || '');
  };

  const handleSaveEdit = async () => {
    if (!editingContact) return;

    const tags = editTags.split(',').map(t => t.trim()).filter(t => t.length > 0);

    setLoading(true);
    try {
      const response = await fetch(`/api/email/contacts/${editingContact.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tags: tags.length > 0 ? tags : null,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setEditingContact(null);
        setEditTags('');
        fetchAllTags(); // Refresh tags list
        fetchContacts();
      } else {
        alert(data.error || 'Failed to update contact');
      }
    } catch (error) {
      alert('Error updating contact');
    } finally {
      setLoading(false);
    }
  };

  const handleImportCSV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith('.csv')) {
      alert('Please upload a CSV file');
      e.target.value = '';
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/email/import-contacts', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        const message = `Successfully imported ${data.imported} new contacts, updated ${data.updated} existing contacts.${data.errors > 0 ? ` ${data.errors} errors occurred.` : ''}${data.importTag ? `\n\nContacts tagged with: "${data.importTag}"` : ''}`;
        alert(message);
        if (data.errorDetails && data.errorDetails.length > 0) {
          console.error('Import errors:', data.errorDetails);
        }
        fetchAllTags(); // Refresh tags list
        fetchContacts();
        
        // If we have an import tag, automatically select it in compose tab if user wants
        if (data.importTag && confirm(`Would you like to send an email to the "${data.importTag}" contacts now?`)) {
          setActiveTab('compose');
          setSendToAll(false);
          setSelectedContactTags([data.importTag]);
        }
      } else {
        alert(data.error || 'Failed to import contacts');
      }
    } catch (error: any) {
      console.error('Import error:', error);
      alert(`Error importing contacts: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
      e.target.value = '';
    }
  };

  const handleDeleteBlockedCSV = async (e: React.ChangeEvent<HTMLInputElement>, action: 'delete' | 'block') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      alert('Please upload a CSV file');
      e.target.value = '';
      return;
    }

    if (!confirm(`Are you sure you want to ${action} all contacts in this CSV file?`)) {
      e.target.value = '';
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('action', action);

    try {
      const response = await fetch('/api/email/delete-blocked-contacts', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        const actionText = action === 'delete' ? 'deleted' : 'blocked';
        alert(`Successfully ${actionText} ${data[actionText]} contacts out of ${data.total} emails in the file.`);
        fetchContacts();
        if (activeTab === 'analytics') {
          fetchAnalytics();
        }
      } else {
        alert(data.error || `Failed to ${action} contacts`);
      }
    } catch (error: any) {
      console.error('Error processing file:', error);
      alert(`Error processing file: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
      e.target.value = '';
    }
  };

  const handleSaveCampaign = async (asDraft = true) => {
    if (!campaignName || !campaignSubject || !campaignHtml) {
      alert('Please fill in all required fields');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('/api/email/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: campaignName,
          subject: campaignSubject,
          html_content: campaignHtml,
          text_content: campaignText,
          status: asDraft ? 'draft' : 'scheduled',
        }),
      });
      const data = await response.json();
      if (data.success) {
        alert(asDraft ? 'Campaign saved as draft' : 'Campaign scheduled');
        setCampaignName('');
        setCampaignSubject('');
        setCampaignHtml('');
        setCampaignText('');
        fetchCampaigns();
        setActiveTab('campaigns');
      } else {
        alert(data.error || 'Failed to save campaign');
      }
    } catch (error) {
      alert('Error saving campaign');
    } finally {
      setSaving(false);
    }
  };

  const handleSendCampaign = async (campaignId: number) => {
    if (!confirm('Are you sure you want to send this campaign? This cannot be undone.')) return;

    setSending(true);
    try {
      const tagsToAdd = campaignTagsToAdd ? campaignTagsToAdd.split(',').map(t => t.trim()).filter(t => t) : [];
      
      const response = await fetch('/api/email/send-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId,
          tagFilters: sendToAll ? [] : selectedContactTags,
          tagsToAdd: tagsToAdd.length > 0 ? tagsToAdd : null,
          sendImmediately: true,
        }),
      });
      const data = await response.json();
      if (data.success) {
        alert(`Campaign sent! ${data.sent} emails sent successfully.${tagsToAdd.length > 0 ? ` Tags "${tagsToAdd.join(', ')}" added to recipients.` : ''}`);
        fetchCampaigns();
        setCampaignTagsToAdd('');
        fetchAllTags(); // Refresh tags list
      } else {
        alert(data.error || 'Failed to send campaign');
      }
    } catch (error) {
      alert('Error sending campaign');
    } finally {
      setSending(false);
    }
  };

  const handleDuplicateCampaign = async (campaignId: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/email/campaigns/${campaignId}/duplicate`, {
        method: 'POST',
      });
      const data = await response.json();
      if (data.success) {
        alert('Campaign duplicated successfully!');
        fetchCampaigns();
      } else {
        alert(data.error || 'Failed to duplicate campaign');
      }
    } catch (error) {
      alert('Error duplicating campaign');
    } finally {
      setLoading(false);
    }
  };

  const handleBulkTag = async () => {
    if (!bulkTagInput.trim()) {
      alert('Please enter at least one tag');
      return;
    }

    const tags = bulkTagInput.split(',').map(t => t.trim()).filter(t => t);
    if (tags.length === 0) {
      alert('Please enter valid tags');
      return;
    }

    if (!confirm(`Add tags "${tags.join(', ')}" to all ${contacts.length} currently filtered contacts?`)) {
      return;
    }

    setBulkTagging(true);
    try {
      const filters: any = {};
      if (selectedTags.length > 0) {
        filters.tags = selectedTags;
      }
      if (filterSubscribed !== null) {
        filters.subscribed = filterSubscribed;
      }
      if (filterRole) {
        filters.role = filterRole;
      }
      if (filterCompany) {
        filters.company = filterCompany;
      }
      if (showBlockedOnly) {
        filters.blocked = true;
      }

      const response = await fetch('/api/email/bulk-tag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tags,
          filters: Object.keys(filters).length > 0 ? filters : null,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert(`Successfully added tags "${tags.join(', ')}" to ${data.updated} out of ${data.total} contacts.${data.errors ? `\n\nErrors: ${data.errors.length}` : ''}`);
        setBulkTagInput('');
        fetchAllTags();
        fetchContacts();
      } else {
        alert(data.error || 'Failed to bulk tag contacts');
      }
    } catch (error: any) {
      alert(`Error bulk tagging: ${error.message || 'Unknown error'}`);
    } finally {
      setBulkTagging(false);
    }
  };

  const handleTagRecent = async (hours: number = 1, tagName: string = 'Dec 10') => {
    if (!confirm(`Add tag "${tagName}" to all contacts uploaded in the last ${hours} hour(s)?`)) {
      return;
    }

    setTaggingRecent(true);
    try {
      const response = await fetch('/api/email/tag-recent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tags: [tagName],
          hours,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert(data.message || `Successfully tagged ${data.updated} contacts.${data.errors ? `\n\nErrors: ${data.errors.length}` : ''}`);
        fetchAllTags();
        fetchContacts();
      } else {
        alert(data.error || 'Failed to tag recent contacts');
      }
    } catch (error: any) {
      alert(`Error tagging recent contacts: ${error.message || 'Unknown error'}`);
    } finally {
      setTaggingRecent(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Marketing Admin</h1>
          <p className="text-gray-600">Manage contacts, campaigns, and analytics</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {(['contacts', 'compose', 'campaigns', 'analytics'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">Quick Actions</h3>
                  <p className="text-sm text-gray-600">Tag contacts uploaded in the last hour</p>
                </div>
                <button
                  onClick={() => handleTagRecent(1, 'Dec 10')}
                  disabled={taggingRecent}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 font-semibold"
                >
                  {taggingRecent ? 'Tagging...' : 'Tag Recent (Last Hour) with "Dec 10"'}
                </button>
              </div>
            </div>
            <div className="mb-4 text-sm text-gray-600">
              <strong>Total Contacts:</strong> {totalContactCount.toLocaleString()} | 
              <strong> Displayed:</strong> {contacts.length.toLocaleString()}
              {contacts.length >= 1000 && <span className="text-orange-600"> (Showing first 1000, use filters to narrow down)</span>}
            </div>
            <div className="mb-6 flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by email or name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="min-w-[150px]">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Tags {allTags.length > 0 && `(${allTags.length})`}
                  </label>
                  <button
                    type="button"
                    onClick={fetchAllTags}
                    className="text-xs text-blue-600 hover:text-blue-800"
                    title="Refresh tags"
                  >
                    🔄
                  </button>
                </div>
                <select
                  multiple
                  value={selectedTags}
                  onChange={(e) => {
                    const newTags = Array.from(e.target.selectedOptions, option => option.value);
                    setSelectedTags(newTags);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  size={Math.min(Math.max(allTags.length, 3), 8)}
                  style={{ minHeight: '100px', maxHeight: '200px' }}
                >
                  {allTags.length > 0 ? (
                    allTags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))
                  ) : (
                    <option disabled>No tags found. Click refresh or add tags to contacts.</option>
                  )}
                </select>
              </div>
              <div className="min-w-[150px]">
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
              <div className="min-w-[150px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">Blocked Status</label>
                <select
                  value={showBlockedOnly ? 'blocked' : 'all'}
                  onChange={(e) => setShowBlockedOnly(e.target.value === 'blocked')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="all">All Contacts</option>
                  <option value="blocked">Blocked Only</option>
                </select>
              </div>
              <div className="min-w-[150px]">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <button
                    type="button"
                    onClick={fetchAllRolesAndCompanies}
                    className="text-xs text-blue-600 hover:text-blue-800"
                    title="Refresh roles and companies"
                  >
                    🔄
                  </button>
                </div>
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">All Roles ({allRoles.length})</option>
                  {allRoles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              <div className="min-w-[150px]">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Company</label>
                  <button
                    type="button"
                    onClick={fetchAllRolesAndCompanies}
                    className="text-xs text-blue-600 hover:text-blue-800"
                    title="Refresh roles and companies"
                  >
                    🔄
                  </button>
                </div>
                <select
                  value={filterCompany}
                  onChange={(e) => setFilterCompany(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">All Companies ({allCompanies.length})</option>
                  {allCompanies.map(company => (
                    <option key={company} value={company}>{company}</option>
                  ))}
                </select>
              </div>
              <div className="min-w-[150px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">Created</label>
                <select
                  value={filterDateRange}
                  onChange={(e) => setFilterDateRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="all">All Time</option>
                  <option value="lastHour">Last Hour</option>
                  <option value="today">Today</option>
                  <option value="last24Hours">Last 24 Hours</option>
                  <option value="lastWeek">Last Week</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Import CSV</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleImportCSV}
                    className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <a
                    href="/email-contacts-template.csv"
                    download
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                  >
                    Download Template
                  </a>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  CSV format: Email, First Name, Last Name, Role, Company (optional: Tags, Subscribed)
                </p>
              </div>
              <div className="border-t pt-4 mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Bulk Tag Contacts</label>
                <p className="text-xs text-gray-500 mb-2">
                  Add tags to all contacts matching the current filters (tags, role, company, etc.)
                </p>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={bulkTagInput}
                    onChange={(e) => setBulkTagInput(e.target.value)}
                    placeholder="Tags (comma-separated, e.g., Dec 10, Newsletter)"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !bulkTagging) {
                        handleBulkTag();
                      }
                    }}
                  />
                  <button
                    onClick={handleBulkTag}
                    disabled={bulkTagging || !bulkTagInput.trim()}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                  >
                    {bulkTagging ? 'Tagging...' : 'Add Tags'}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Will tag {contacts.length} contact{contacts.length !== 1 ? 's' : ''} currently displayed (matching filters)
                </p>
                <p className="text-xs text-orange-600 mt-1">
                  Note: Only tags contacts currently displayed. For all contacts, use "Tag Recent" button above or clear filters.
                </p>
              </div>
              <div className="border-t pt-4 mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Delete/Block Contacts from CSV</label>
                <p className="text-xs text-gray-500 mb-2">
                  Upload a CSV file with email addresses (one per line, or first column). This will delete or block all matching contacts.
                </p>
                <div className="flex gap-2 items-center">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => handleDeleteBlockedCSV(e, 'delete')}
                    className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                    id="delete-csv-input"
                  />
                  <label htmlFor="delete-csv-input" className="text-sm text-red-600 hover:text-red-800 cursor-pointer">
                    Delete from CSV
                  </label>
                </div>
                <div className="flex gap-2 items-center mt-2">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => handleDeleteBlockedCSV(e, 'block')}
                    className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                    id="block-csv-input"
                  />
                  <label htmlFor="block-csv-input" className="text-sm text-orange-600 hover:text-orange-800 cursor-pointer">
                    Block from CSV
                  </label>
                </div>
              </div>
            </div>

            {/* Add Contact Form */}
            <form onSubmit={handleAddContact} className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-3">Add New Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email *"
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  name="role"
                  placeholder="Role"
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="tags"
                    placeholder="Tags (comma-separated)"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>

            {/* Contacts Table */}
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tags</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {contacts.map((contact) => (
                      <tr key={contact.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{contact.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {contact.first_name} {contact.last_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {contact.role || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {contact.company || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {editingContact?.id === contact.id ? (
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={editTags}
                                onChange={(e) => setEditTags(e.target.value)}
                                placeholder="Tags (comma-separated)"
                                className="px-2 py-1 border border-gray-300 rounded text-sm w-48"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleSaveEdit();
                                  } else if (e.key === 'Escape') {
                                    setEditingContact(null);
                                    setEditTags('');
                                  }
                                }}
                              />
                              <button
                                onClick={handleSaveEdit}
                                className="text-blue-600 hover:text-blue-900 text-sm"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => {
                                  setEditingContact(null);
                                  setEditTags('');
                                }}
                                className="text-gray-600 hover:text-gray-900 text-sm"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span>{contact.tags?.join(', ') || '-'}</span>
                              <button
                                onClick={() => handleEditContact(contact)}
                                className="text-blue-600 hover:text-blue-900 text-xs"
                                title="Edit tags"
                              >
                                ✏️
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col gap-1">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              contact.subscribed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {contact.subscribed ? 'Subscribed' : 'Unsubscribed'}
                            </span>
                            {contact.blocked && (
                              <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800">
                                Blocked
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex gap-2">
                            {!contact.blocked ? (
                              <button
                                onClick={() => handleBlockContact(contact.id, contact.email)}
                                className="text-orange-600 hover:text-orange-900"
                                title="Mark as blocked/spam"
                              >
                                Block
                              </button>
                            ) : (
                              <button
                                onClick={() => handleUnblockContact(contact.id, contact.email)}
                                className="text-green-600 hover:text-green-900"
                                title="Unblock contact"
                              >
                                Unblock
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteContact(contact.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {contacts.length === 0 && (
                  <div className="text-center py-8 text-gray-500">No contacts found</div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Compose Tab */}
        {activeTab === 'compose' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Compose Campaign</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name *</label>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="e.g., Monthly Newsletter - January 2025"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject Line *</label>
                <input
                  type="text"
                  value={campaignSubject}
                  onChange={(e) => setCampaignSubject(e.target.value)}
                  placeholder="Email subject line"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={sendToAll}
                      onChange={(e) => {
                        setSendToAll(e.target.checked);
                        if (e.target.checked) {
                          setSelectedContactTags([]);
                        }
                      }}
                      className="mr-2"
                    />
                    Send to all subscribed contacts
                  </label>
                  
                  {/* Recipient Count Preview */}
                  <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                    {loadingRecipients ? (
                      <p className="text-sm text-gray-600">Calculating recipients...</p>
                    ) : recipientCount !== null ? (
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          📧 Will send to: <span className="text-blue-600">{recipientCount.toLocaleString()}</span> contact{recipientCount !== 1 ? 's' : ''}
                        </p>
                        {!sendToAll && selectedContactTags.length > 0 && (
                          <p className="text-xs text-gray-500 mt-1">
                            Based on tags: {selectedContactTags.join(', ')}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">Select recipients above to see count</p>
                    )}
                  </div>
                  
                  {/* Quick Actions */}
                  {!sendToAll && (
                    <div className="flex gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={async () => {
                          await fetchAllTags(); // Refresh tags first
                          const todayTag = `Imported ${new Date().toISOString().split('T')[0]}`;
                          if (allTags.includes(todayTag)) {
                            setSelectedContactTags([todayTag]);
                          } else {
                            alert(`No contacts found with tag "${todayTag}". Make sure you've imported contacts today.`);
                          }
                        }}
                        className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                      >
                        📥 Send to Today's Imports
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          await fetchAllTags(); // Refresh tags first
                          // Look for filename-based tags first (most reliable)
                          // Then fall back to date-based import tags
                          const filenameTags = allTags.filter(tag => 
                            !tag.startsWith('Imported ') && 
                            !tag.startsWith('Dec ') &&
                            tag.length > 0
                          );
                          
                          if (filenameTags.length > 0) {
                            // Get the most recently added tag (usually last in sorted list, but check by finding most recent)
                            // For now, just use the last one alphabetically (which often corresponds to most recent)
                            const sorted = filenameTags.sort();
                            setSelectedContactTags([sorted[sorted.length - 1]]);
                          } else {
                            // Fall back to date-based import tags
                            const recentTags = allTags.filter(tag => tag.startsWith('Imported '));
                            if (recentTags.length > 0) {
                              const sorted = recentTags.sort().reverse();
                              setSelectedContactTags([sorted[0]]);
                            } else {
                              alert('No recently imported contacts found. Import contacts first.');
                            }
                          }
                        }}
                        className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                      >
                        📥 Send to Last Import
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          await fetchAllTags(); // Refresh tags first
                          // Show a simple dialog to select from recent imports
                          const filenameTags = allTags.filter(tag => 
                            !tag.startsWith('Imported ') && 
                            !tag.startsWith('Dec ') &&
                            tag.length > 0 &&
                            tag !== 'JP Morgan' && // Exclude common tags
                            tag !== 'capgemini' &&
                            tag !== 'lenovo'
                          );
                          
                          if (filenameTags.length === 0) {
                            // If no filename tags, let them type the tag name directly
                            const tagName = prompt('No import tags found. Enter the tag name you want to send to (e.g., "leadership"):');
                            if (tagName && tagName.trim()) {
                              // Check if tag exists
                              if (allTags.includes(tagName.trim())) {
                                setSelectedContactTags([tagName.trim()]);
                              } else {
                                // Tag doesn't exist, offer to create it for recent contacts
                                if (confirm(`Tag "${tagName.trim()}" not found. Would you like to tag all contacts from the last hour with this tag?`)) {
                                  setBulkTagInput(tagName.trim());
                                  // Switch to contacts tab to use bulk tag
                                  setActiveTab('contacts');
                                  setTimeout(() => {
                                    setFilterDateRange('lastHour');
                                    setTimeout(() => {
                                      handleBulkTag();
                                    }, 500);
                                  }, 100);
                                }
                              }
                            }
                            return;
                          }
                          
                          // Show most recent 5 filename tags
                          const recentTags = filenameTags.slice(-5).reverse();
                          const tagList = recentTags.map((tag, i) => `${i + 1}. ${tag}`).join('\n');
                          const selection = prompt(`Select an import to send to:\n\n${tagList}\n\nOr enter a tag name:`);
                          
                          if (selection && allTags.includes(selection)) {
                            setSelectedContactTags([selection]);
                          } else if (selection) {
                            // Tag doesn't exist, offer to create it
                            if (confirm(`Tag "${selection}" not found. Would you like to tag all contacts from the last hour with this tag?`)) {
                              setBulkTagInput(selection);
                              setActiveTab('contacts');
                              setTimeout(() => {
                                setFilterDateRange('lastHour');
                                setTimeout(() => {
                                  handleBulkTag();
                                }, 500);
                              }, 100);
                            }
                          }
                        }}
                        className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200"
                      >
                        📋 Choose Import
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          const tagName = prompt('Enter the tag name to send to (e.g., "leadership"):');
                          if (tagName && tagName.trim()) {
                            await fetchAllTags();
                            if (allTags.includes(tagName.trim())) {
                              setSelectedContactTags([tagName.trim()]);
                            } else {
                              alert(`Tag "${tagName.trim()}" not found. Available tags: ${allTags.slice(0, 10).join(', ')}${allTags.length > 10 ? '...' : ''}\n\nGo to Contacts tab and use "Tag Recent" to add this tag to recent imports.`);
                            }
                          }
                        }}
                        className="px-3 py-1 text-sm bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200"
                      >
                        🔍 Search Tag
                      </button>
                      <button
                        type="button"
                        onClick={fetchAllTags}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                        title="Refresh tag list"
                      >
                        🔄 Refresh Tags
                      </button>
                    </div>
                  )}
                  
                  {!sendToAll && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm text-gray-600">Select by tags ({allTags.length} available):</label>
                        <button
                          type="button"
                          onClick={fetchAllTags}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Refresh
                        </button>
                      </div>
                      <select
                        multiple
                        value={selectedContactTags}
                        onChange={(e) => setSelectedContactTags(Array.from(e.target.selectedOptions, option => option.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md min-h-[150px]"
                        size={Math.min(Math.max(allTags.length, 5), 15)}
                      >
                        {allTags.length > 0 ? (
                          allTags.map(tag => (
                            <option key={tag} value={tag}>{tag}</option>
                          ))
                        ) : (
                          <option disabled>No tags found. Click Refresh or import contacts.</option>
                        )}
                      </select>
                      {selectedContactTags.length > 0 && (
                        <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200">
                          <p className="text-xs font-semibold text-blue-900 mb-1">Selected Tags:</p>
                          <div className="flex flex-wrap gap-1">
                            {selectedContactTags.map(tag => (
                              <span key={tag} className="px-2 py-1 bg-blue-200 text-blue-800 text-xs rounded">
                                {tag} ×
                                <button
                                  type="button"
                                  onClick={() => setSelectedContactTags(selectedContactTags.filter(t => t !== tag))}
                                  className="ml-1 hover:text-red-600"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Add Tags to Recipients (optional)</label>
                <input
                  type="text"
                  value={campaignTagsToAdd}
                  onChange={(e) => setCampaignTagsToAdd(e.target.value)}
                  placeholder="Tags to add to recipients (comma-separated, e.g., Dec 10, Newsletter)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <p className="text-xs text-gray-500 mt-1">
                  These tags will be automatically added to all recipients when the campaign is sent.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Content (HTML) *</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Edit HTML:</p>
                    <textarea
                      value={campaignHtml}
                      onChange={(e) => setCampaignHtml(e.target.value)}
                      rows={12}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
                      placeholder="<html><body><h1>Your email content here</h1></body></html>"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Preview:</p>
                    <div 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white min-h-[200px]"
                      dangerouslySetInnerHTML={{ __html: campaignHtml || '<p class="text-gray-400">Preview will appear here</p>' }}
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Tip: Use HTML tags. Unsubscribe link will be automatically added to the footer.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Plain Text Version (optional)</label>
                <textarea
                  value={campaignText}
                  onChange={(e) => setCampaignText(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Plain text version for email clients that don't support HTML"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => handleSaveCampaign(true)}
                  disabled={saving}
                  className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save as Draft'}
                </button>
                <button
                  onClick={() => handleSaveCampaign(false)}
                  disabled={saving}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save & Schedule'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Campaigns Tab */}
        {activeTab === 'campaigns' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Campaigns</h2>
              <div className="text-sm text-gray-600">
                <p><strong>Draft:</strong> Saved but not ready to send</p>
                <p><strong>Scheduled:</strong> Ready to send (click "Send Now" to send immediately)</p>
                <p><strong>Sent:</strong> Already sent to recipients</p>
              </div>
            </div>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{campaign.name}</h3>
                        <p className="text-sm text-gray-600">Subject: {campaign.subject}</p>
                      </div>
                      <span className={`px-3 py-1 text-xs rounded-full ${
                        campaign.status === 'sent' ? 'bg-green-100 text-green-800' :
                        campaign.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                        campaign.status === 'sending' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mb-3">
                      Created: {new Date(campaign.created_at).toLocaleDateString()}
                      {campaign.sent_at && ` | Sent: ${new Date(campaign.sent_at).toLocaleDateString()}`}
                      {campaign.sent_count > 0 && ` | Sent to ${campaign.sent_count} contacts`}
                    </div>
                    <div className="flex gap-2">
                      {(campaign.status === 'draft' || campaign.status === 'scheduled') && (
                        <button
                          onClick={() => handleSendCampaign(campaign.id)}
                          disabled={sending}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                          {sending ? 'Sending...' : 'Send Now'}
                        </button>
                      )}
                      <button
                        onClick={() => handleDuplicateCampaign(campaign.id)}
                        disabled={loading}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
                        title="Duplicate this campaign"
                      >
                        {loading ? 'Duplicating...' : 'Duplicate'}
                      </button>
                    </div>
                  </div>
                ))}
                {campaigns.length === 0 && (
                  <div className="text-center py-8 text-gray-500">No campaigns yet</div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Analytics</h2>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : analytics ? (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{analytics.totalSent || 0}</div>
                    <div className="text-sm text-gray-600">Total Sent</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{analytics.totalOpened || 0}</div>
                    <div className="text-sm text-gray-600">Total Opened</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{analytics.totalClicked || 0}</div>
                    <div className="text-sm text-gray-600">Total Clicked</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{analytics.totalBounced || 0}</div>
                    <div className="text-sm text-gray-600">Total Bounced</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{analytics.totalBlocked || 0}</div>
                    <div className="text-sm text-gray-600">Blocked/Spam</div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">Open Rate: {analytics.openRate || 0}%</div>
                  <div className="text-sm text-gray-600 mb-2">Click Rate: {analytics.clickRate || 0}%</div>
                  <div className="text-sm text-gray-600 mb-2">Bounce Rate: {analytics.bounceRate || 0}%</div>
                  <div className="text-sm text-gray-600">Blocked Contacts: {analytics.totalBlocked || 0} (automatically excluded from campaigns)</div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">No analytics data available</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

