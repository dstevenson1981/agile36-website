'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

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

// Recipient filters that can be passed from Contacts to Compose
interface RecipientFilters {
  tags?: string[];
  role?: string;
  company?: string;
  dateRange?: string;
  subscribed?: boolean;
  search?: string;
}

function EmailAdminContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('contacts');
  const [filtersFromContacts, setFiltersFromContacts] = useState<RecipientFilters | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [totalContactCount, setTotalContactCount] = useState<number>(0);
  const [filteredContactCount, setFilteredContactCount] = useState<number>(0);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Contact filters
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [filterSubscribed, setFilterSubscribed] = useState<boolean | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('');
  const [filterCompany, setFilterCompany] = useState<string>('');
  const [filterDateRange, setFilterDateRange] = useState<string>('all');
  const [allRoles, setAllRoles] = useState<string[]>([]);
  const [allCompanies, setAllCompanies] = useState<string[]>([]);
  
  // Campaign composer state
  const [campaignName, setCampaignName] = useState('');
  const [campaignSubject, setCampaignSubject] = useState('');
  const [campaignHtml, setCampaignHtml] = useState('');
  const [campaignText, setCampaignText] = useState('');
  
  // Recipient selection (for compose tab)
  const [recipientFilters, setRecipientFilters] = useState<RecipientFilters>({});
  const [sendToAll, setSendToAll] = useState(false);
  const [recipientCount, setRecipientCount] = useState<number>(0);
  const [campaignTagsToAdd, setCampaignTagsToAdd] = useState<string>('');
  
  // UI state
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendingTest, setSendingTest] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleDateTime, setScheduleDateTime] = useState('');
  
  // Bulk actions
  const [bulkTagInput, setBulkTagInput] = useState('');
  const [bulkTagging, setBulkTagging] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [csvPreview, setCsvPreview] = useState<{ count: number; hasTags: boolean } | null>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [importBulkTags, setImportBulkTags] = useState('');
  
  // Tag management
  const [showManageTagsModal, setShowManageTagsModal] = useState(false);
  const [tagStats, setTagStats] = useState<{ tag: string; count: number }[]>([]);
  const [removingTag, setRemovingTag] = useState<string | null>(null);
  const [tagToRemove, setTagToRemove] = useState<string | null>(null);
  const [tagRemoveConfirm, setTagRemoveConfirm] = useState(false);

  // Check URL parameters on mount and when tab changes
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['contacts', 'compose', 'campaigns', 'analytics'].includes(tab)) {
      setActiveTab(tab as Tab);
    }

    // If coming from Contacts page with filters
    if (tab === 'compose') {
      const filters: RecipientFilters = {};
      const tags = searchParams.get('tags');
      const role = searchParams.get('role');
      const company = searchParams.get('company');
      const search = searchParams.get('search');
      
      if (tags) filters.tags = tags.split(',');
      if (role) filters.role = role;
      if (company) filters.company = company;
      if (search) filters.search = search;
      
      if (Object.keys(filters).length > 0) {
        setFiltersFromContacts(filters);
        setRecipientFilters(filters);
        setSendToAll(false);
      }
    }
  }, [searchParams]);

  // Fetch total subscribed contacts count on mount (no filters)
  useEffect(() => {
    if (activeTab === 'contacts') {
      // Fetch total subscribed contacts count
      fetch('/api/email/contacts?subscribed=true&blocked=false')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setTotalContactCount(data.totalCount || 0);
          }
        })
        .catch(err => console.error('Error fetching total count:', err));
    }
  }, [activeTab]);

  // Fetch data on mount and tab changes
  useEffect(() => {
    if (activeTab === 'contacts') {
      fetchContacts();
      fetchAllTags();
      fetchAllRolesAndCompanies();
      fetchTagStats();
    } else if (activeTab === 'campaigns') {
      fetchCampaigns();
    } else if (activeTab === 'analytics') {
      fetchAnalytics();
    } else if (activeTab === 'compose') {
      fetchAllTags();
      fetchAllRolesAndCompanies();
      fetchRecipientCount();
    }
  }, [activeTab]);

  // Fetch contacts when filters change
  useEffect(() => {
    if (activeTab === 'contacts') {
      fetchContacts();
    }
  }, [selectedTags, filterSubscribed, searchTerm, filterRole, filterCompany, filterDateRange]);

  // Fetch recipient count when compose filters change
  useEffect(() => {
    if (activeTab === 'compose') {
      fetchRecipientCount();
    }
  }, [sendToAll, recipientFilters, activeTab]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedTags.length > 0) {
        params.append('tags', selectedTags.join(','));
      }
      if (searchTerm) {
        params.append('search', searchTerm);
      }
      if (filterRole) {
        params.append('role', filterRole);
      }
      if (filterCompany) {
        params.append('company', filterCompany);
      }
      // Only show subscribed contacts by default
      params.append('subscribed', 'true');

      const response = await fetch(`/api/email/contacts?${params.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        setContacts(data.contacts);
        // totalCount is the total matching the filters
        const filteredTotal = data.totalCount || data.contacts?.length || 0;
        setFilteredContactCount(filteredTotal);
        
        // If no filters, this is also the total subscribed count
        if (selectedTags.length === 0 && !searchTerm && !filterRole && !filterCompany) {
          setTotalContactCount(filteredTotal);
        }
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllTags = async () => {
    try {
      const response = await fetch('/api/email/contact-options');
      const data = await response.json();
      if (data.success && data.tags) {
        setAllTags(data.tags);
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const fetchTagStats = async () => {
    try {
      const response = await fetch('/api/email/tag-stats');
      const data = await response.json();
      if (data.success && data.tags) {
        setTagStats(data.tags);
      }
    } catch (error) {
      console.error('Error fetching tag stats:', error);
    }
  };

  const handleRemoveTagFromContact = async (contactId: number, tagToRemove: string) => {
    try {
      const contact = contacts.find(c => c.id === contactId);
      if (!contact) return;

      const currentTags = contact.tags || [];
      const newTags = currentTags.filter(t => t.trim().toLowerCase() !== tagToRemove.trim().toLowerCase());

      const response = await fetch(`/api/email/contacts/${contactId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tags: newTags.length > 0 ? newTags : null }),
      });

      const data = await response.json();
      if (data.success) {
        fetchContacts();
        fetchAllTags();
      } else {
        alert(data.error || 'Failed to remove tag');
      }
    } catch (error) {
      console.error('Error removing tag:', error);
      alert('Failed to remove tag');
    }
  };

  const handleRemoveTagFromAll = async (tag: string) => {
    setRemovingTag(tag);
    try {
      const response = await fetch('/api/email/remove-tag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tag }),
      });

      const data = await response.json();
      if (data.success) {
        alert(data.message || `Removed tag "${tag}" from ${data.removed} contacts`);
        fetchContacts();
        fetchAllTags();
        fetchTagStats();
        setTagToRemove(null);
        setTagRemoveConfirm(false);
      } else {
        alert(data.error || 'Failed to remove tag');
      }
    } catch (error) {
      console.error('Error removing tag:', error);
      alert('Failed to remove tag');
    } finally {
      setRemovingTag(null);
    }
  };

  const handleRemoveTagFromAllExceptSelected = async (tag: string) => {
    const selectedContactIds = contacts.map(c => c.id);
    
    if (selectedContactIds.length === 0) {
      alert('No contacts selected. Filter to show the contacts that should KEEP the tag, then try again.');
      return;
    }

    if (!confirm(`Remove tag "${tag}" from all contacts EXCEPT the ${selectedContactIds.length} currently displayed contacts?`)) {
      return;
    }

    setRemovingTag(tag);
    try {
      const response = await fetch('/api/email/remove-tag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tag, excludeContactIds: selectedContactIds }),
      });

      const data = await response.json();
      if (data.success) {
        alert(data.message || `Removed tag "${tag}" from ${data.removed} contacts`);
        fetchContacts();
        fetchAllTags();
        fetchTagStats();
      } else {
        alert(data.error || 'Failed to remove tag');
      }
    } catch (error) {
      console.error('Error removing tag:', error);
      alert('Failed to remove tag');
    } finally {
      setRemovingTag(null);
    }
  };

  const fetchAllRolesAndCompanies = async () => {
    try {
      const response = await fetch('/api/email/contact-options');
      const data = await response.json();
      if (data.success) {
        setAllRoles(data.roles || []);
        setAllCompanies(data.companies || []);
      }
    } catch (error) {
      console.error('Error fetching roles and companies:', error);
    }
  };

  const fetchRecipientCount = async () => {
    try {
      if (sendToAll) {
        const response = await fetch('/api/email/contacts?subscribed=true&blocked=false');
        const data = await response.json();
        if (data.success) {
          setRecipientCount(data.totalCount || data.contacts?.length || 0);
        }
      } else {
        const params = new URLSearchParams();
        if (recipientFilters.tags && recipientFilters.tags.length > 0) {
          params.append('tags', recipientFilters.tags.join(','));
        }
        if (recipientFilters.role) {
          params.append('role', recipientFilters.role);
        }
        if (recipientFilters.company) {
          params.append('company', recipientFilters.company);
        }
        if (recipientFilters.dateRange) {
          params.append('dateRange', recipientFilters.dateRange);
        }
        params.append('subscribed', 'true');
        params.append('blocked', 'false');
        
        const response = await fetch(`/api/email/contacts?${params.toString()}`);
        const data = await response.json();
        if (data.success) {
          setRecipientCount(data.totalCount || data.contacts?.length || 0);
        }
      }
    } catch (error) {
      console.error('Error fetching recipient count:', error);
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
        // Handle analytics data
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCampaignFromContacts = () => {
    // Build URL with filter parameters
    const params = new URLSearchParams();
    params.set('tab', 'compose');
    if (selectedTags.length > 0) {
      params.set('tags', selectedTags.join(','));
    }
    if (filterRole) {
      params.set('role', filterRole);
    }
    if (filterCompany) {
      params.set('company', filterCompany);
    }
    if (searchTerm) {
      params.set('search', searchTerm);
    }
    
    // Navigate to compose tab with filters
    router.push(`/admin/email?${params.toString()}`);
  };

  const handleSendTestEmail = async () => {
    if (!campaignSubject || !campaignHtml) {
      alert('Please fill in subject and email content first');
      return;
    }

    setSendingTest(true);
    try {
      const response = await fetch('/api/email/send-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: campaignSubject,
          html: campaignHtml,
          text: campaignText,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Test email sent to m.ball@agile36.com');
      } else {
        alert(data.error || 'Failed to send test email');
      }
    } catch (error) {
      alert('Error sending test email');
    } finally {
      setSendingTest(false);
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

  const handleSendNow = async () => {
    if (!campaignName || !campaignSubject || !campaignHtml) {
      alert('Please fill in all required fields');
      return;
    }

    if (!confirm(`Send this campaign to ${recipientCount} contact${recipientCount !== 1 ? 's' : ''}? This cannot be undone.`)) {
      return;
    }

    // First save the campaign
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
          status: 'scheduled',
        }),
      });
      const data = await response.json();
      if (data.success) {
        // Then send it
        setSending(true);
        const sendResponse = await fetch('/api/email/send-campaign', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            campaignId: data.campaign.id,
            tagFilters: sendToAll ? [] : (recipientFilters.tags || []),
            dateRange: recipientFilters.dateRange,
            role: recipientFilters.role,
            company: recipientFilters.company,
            tagsToAdd: campaignTagsToAdd ? campaignTagsToAdd.split(',').map(t => t.trim()).filter(t => t) : null,
            sendImmediately: true,
          }),
        });
        const sendData = await sendResponse.json();
        if (sendData.success) {
          alert(`Campaign sent! ${sendData.sent} emails sent successfully.`);
          setCampaignName('');
          setCampaignSubject('');
          setCampaignHtml('');
          setCampaignText('');
          fetchCampaigns();
          setActiveTab('campaigns');
        } else {
          alert(sendData.error || 'Failed to send campaign');
        }
      } else {
        alert(data.error || 'Failed to save campaign');
      }
    } catch (error) {
      alert('Error sending campaign');
    } finally {
      setSaving(false);
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Email Marketing</h1>
          <p className="text-gray-600 mt-1">Manage contacts, campaigns, and analytics</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {(['contacts', 'compose', 'campaigns', 'analytics'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  router.push(`/admin/email?tab=${tab}`);
                }}
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
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              {/* Action Buttons - Top of Page */}
              <div className="mb-6 flex flex-wrap gap-3 pb-4 border-b border-gray-200">
                <button
                  onClick={() => setShowImportModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
                >
                  📥 Import Contacts
                </button>
                <a
                  href="/email-contacts-template.csv"
                  download
                  className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 text-sm font-medium inline-flex items-center gap-2"
                >
                  📄 Download CSV Template
                </a>
                <button
                  onClick={() => setShowAddContact(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium"
                >
                  ➕ Add Single Contact
                </button>
              </div>

              {/* Simple Filter Bar */}
              <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Email or name..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Tags</label>
                    <button
                      onClick={() => {
                        setShowManageTagsModal(true);
                        fetchTagStats();
                      }}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      Manage Tags
                    </button>
                  </div>
                  <div className="relative">
                    <select
                      multiple
                      value={selectedTags}
                      onChange={(e) => setSelectedTags(Array.from(e.target.selectedOptions, option => option.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md pr-8"
                      size={3}
                    >
                      {allTags.map(tag => (
                        <option key={tag} value={tag}>{tag}</option>
                      ))}
                    </select>
                  </div>
                  {selectedTags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {selectedTags.map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                        >
                          {tag}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const tagCount = tagStats.find(t => t.tag === tag)?.count || 0;
                              if (confirm(`Remove tag "${tag}" from all ${tagCount} contact${tagCount !== 1 ? 's' : ''}?`)) {
                                handleRemoveTagFromAll(tag);
                              }
                            }}
                            className="text-blue-600 hover:text-red-600 font-bold"
                            title={`Remove "${tag}" from all contacts`}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <select
                    value={filterCompany}
                    onChange={(e) => setFilterCompany(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">All Companies</option>
                    {allCompanies.map(company => (
                      <option key={company} value={company}>{company}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">All Roles</option>
                    {allRoles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Contact Count Display */}
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <strong>Total Contacts:</strong> {totalContactCount.toLocaleString()} | 
                  <strong> Displayed:</strong> {contacts.length.toLocaleString()}
                  {filteredContactCount !== contacts.length && (
                    <span className="ml-2 text-blue-600">
                      (Filtered: {filteredContactCount.toLocaleString()})
                    </span>
                  )}
                </div>
                {selectedTags.length > 0 && (
                  <button
                    onClick={() => {
                      const tag = selectedTags[0];
                      if (confirm(`Remove tag "${tag}" from all contacts EXCEPT the ${contacts.length} currently displayed?`)) {
                        handleRemoveTagFromAllExceptSelected(tag);
                      }
                    }}
                    className="text-xs px-3 py-1 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
                    title="Remove tag from all contacts except those currently displayed"
                  >
                    Remove "{selectedTags[0]}" from all others
                  </button>
                )}
              </div>

              {/* Contacts Table - Clean and Simple */}
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tags</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {contacts.map((contact) => (
                        <tr key={contact.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{contact.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {contact.first_name} {contact.last_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {contact.company || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {contact.tags && contact.tags.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {contact.tags.map((tag, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => {
                                      if (confirm(`Remove tag "${tag}" from ${contact.email}?`)) {
                                        handleRemoveTagFromContact(contact.id, tag);
                                      }
                                    }}
                                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-red-100 hover:text-red-700 cursor-pointer text-xs"
                                    title={`Click to remove "${tag}" from this contact`}
                                  >
                                    {tag}
                                  </button>
                                ))}
                              </div>
                            ) : (
                              '-'
                            )}
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

            {/* Sticky Next Button - Always Visible */}
            <div className="sticky bottom-0 left-0 right-0 p-6 bg-white border-t-2 border-blue-200 shadow-lg z-10">
              <button
                onClick={handleCreateCampaignFromContacts}
                disabled={filteredContactCount === 0}
                className="w-full px-6 py-4 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
              >
                <span>Next: Create Campaign ({filteredContactCount.toLocaleString()} contacts)</span>
                <span>→</span>
              </button>
            </div>
          </div>
        )}

        {/* Manage Tags Modal */}
        {showManageTagsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Manage Tags</h3>
                <button
                  onClick={() => {
                    setShowManageTagsModal(false);
                    setTagToRemove(null);
                    setTagRemoveConfirm(false);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              
              <div className="mb-4 text-sm text-gray-600">
                Click "Delete" to remove a tag from all contacts that have it.
              </div>

              {tagStats.length === 0 ? (
                <div className="text-center py-8 text-gray-500">Loading tag statistics...</div>
              ) : (
                <div className="space-y-2">
                  {tagStats.map(({ tag, count }) => (
                    <div
                      key={tag}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded border"
                    >
                      <div>
                        <span className="font-medium text-gray-900">{tag}</span>
                        <span className="ml-2 text-sm text-gray-500">
                          ({count.toLocaleString()} contact{count !== 1 ? 's' : ''})
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          if (tagRemoveConfirm && tagToRemove === tag) {
                            handleRemoveTagFromAll(tag);
                          } else {
                            setTagToRemove(tag);
                            setTagRemoveConfirm(true);
                          }
                        }}
                        disabled={removingTag === tag}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 disabled:opacity-50"
                      >
                        {removingTag === tag
                          ? 'Removing...'
                          : tagRemoveConfirm && tagToRemove === tag
                          ? 'Confirm Delete'
                          : 'Delete'}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {tagRemoveConfirm && tagToRemove && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-sm text-yellow-800">
                    <strong>Confirm:</strong> Remove tag "{tagToRemove}" from all contacts? This cannot be undone.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => handleRemoveTagFromAll(tagToRemove)}
                      disabled={removingTag === tagToRemove}
                      className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 disabled:opacity-50"
                    >
                      {removingTag === tagToRemove ? 'Removing...' : 'Yes, Delete'}
                    </button>
                    <button
                      onClick={() => {
                        setTagToRemove(null);
                        setTagRemoveConfirm(false);
                      }}
                      className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-4 border-t">
                <button
                  onClick={() => {
                    setShowManageTagsModal(false);
                    setTagToRemove(null);
                    setTagRemoveConfirm(false);
                  }}
                  className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Import Modal */}
        {showImportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4">Import Contacts</h3>
              
              {!csvPreview ? (
                <>
                  <div className="mb-4">
                    <input
                      type="file"
                      accept=".csv"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setCsvFile(file);
                        
                        // Preview CSV to check for Tags column
                        const text = await file.text();
                        const lines = text.split('\n').filter(line => line.trim());
                        if (lines.length < 2) {
                          alert('CSV file appears to be empty or invalid');
                          return;
                        }
                        
                        // Check headers for Tags column (case-insensitive)
                        const headerLine = lines[0];
                        const headers = headerLine.split(',').map(h => h.trim().toLowerCase());
                        const hasTags = headers.includes('tags');
                        const recordCount = lines.length - 1; // Exclude header
                        
                        setCsvPreview({ count: recordCount, hasTags });
                      }}
                      className="w-full mb-2"
                    />
                    <a href="/email-contacts-template.csv" download className="text-sm text-blue-600 hover:text-blue-800">
                      Download CSV Template
                    </a>
                    <p className="text-xs text-gray-500 mt-2">
                      CSV Format: Email, First Name, Last Name, Role, Company, Tags (optional)
                    </p>
                  </div>
                  <button
                    onClick={() => setShowImportModal(false)}
                    className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <div className="mb-4 p-4 bg-blue-50 rounded border border-blue-200">
                    <p className="text-sm font-semibold text-blue-900 mb-2">
                      Found {csvPreview.count} contact{csvPreview.count !== 1 ? 's' : ''}
                    </p>
                    {csvPreview.hasTags ? (
                      <p className="text-sm text-blue-700">
                        ✓ Tags column detected in CSV. Each contact will use tags from the CSV.
                      </p>
                    ) : (
                      <div>
                        <p className="text-sm text-blue-700 mb-2">
                          No Tags column found. Add tags to all imported contacts? (optional)
                        </p>
                        <input
                          type="text"
                          value={importBulkTags}
                          onChange={(e) => setImportBulkTags(e.target.value)}
                          placeholder="Tags (comma-separated, e.g., Leadership, Dec 10)"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={async () => {
                        if (!csvFile) return;
                        setLoading(true);
                        const formData = new FormData();
                        formData.append('file', csvFile);
                        if (importBulkTags.trim()) {
                          formData.append('bulkTags', importBulkTags.trim());
                        }
                        
                        try {
                          const response = await fetch('/api/email/import-contacts', { method: 'POST', body: formData });
                          const data = await response.json();
                          if (data.success) {
                            alert(`Successfully imported ${data.imported} contacts, updated ${data.updated} existing contacts.${data.errors > 0 ? ` ${data.errors} errors occurred.` : ''}`);
                            fetchAllTags();
                            fetchAllRolesAndCompanies();
                            fetchContacts();
                            setShowImportModal(false);
                            setCsvPreview(null);
                            setCsvFile(null);
                            setImportBulkTags('');
                          } else {
                            alert(data.error || 'Import failed');
                          }
                        } catch (error) {
                          alert('Import error');
                        } finally {
                          setLoading(false);
                        }
                      }}
                      disabled={loading}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                      {loading ? 'Importing...' : 'Import'}
                    </button>
                    <button
                      onClick={() => {
                        setCsvPreview(null);
                        setCsvFile(null);
                        setImportBulkTags('');
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => {
                        setShowImportModal(false);
                        setCsvPreview(null);
                        setCsvFile(null);
                        setImportBulkTags('');
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Add Contact Modal */}
        {showAddContact && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">Add Contact</h3>
              <form onSubmit={async (e) => {
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
                    fetchAllTags();
                    fetchAllRolesAndCompanies();
                    fetchContacts();
                    setShowAddContact(false);
                  } else {
                    alert(data.error || 'Failed to add contact');
                  }
                } catch (error) {
                  alert('Error adding contact');
                } finally {
                  setLoading(false);
                }
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input type="email" name="email" required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input type="text" name="firstName" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input type="text" name="lastName" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <input type="text" name="role" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                      <input type="text" name="company" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                    <input type="text" name="tags" placeholder="Comma-separated" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                  </div>
                </div>
                <div className="mt-6 flex gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? 'Adding...' : 'Add Contact'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddContact(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Compose Tab - Will continue in next part due to length */}
        {activeTab === 'compose' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">Compose Campaign</h2>
            
            {/* Recipients Section - TOP OF PAGE */}
            <div className="mb-8 p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recipients</h3>
              
              <div className="mb-4 p-4 bg-white rounded border border-blue-200">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {recipientCount.toLocaleString()} contact{recipientCount !== 1 ? 's' : ''} will receive this email
                </div>
                {filtersFromContacts && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                    <div className="text-sm font-semibold text-green-900 mb-1">
                      ✓ Recipients from Contacts page
                    </div>
                    <div className="text-sm text-gray-700">
                      {filtersFromContacts.tags && filtersFromContacts.tags.length > 0 && (
                        <span>Tags: {filtersFromContacts.tags.join(', ')}</span>
                      )}
                      {filtersFromContacts.tags && filtersFromContacts.tags.length > 0 && (filtersFromContacts.role || filtersFromContacts.company) && ' • '}
                      {filtersFromContacts.role && <span>Role: {filtersFromContacts.role}</span>}
                      {filtersFromContacts.role && filtersFromContacts.company && ' • '}
                      {filtersFromContacts.company && <span>Company: {filtersFromContacts.company}</span>}
                      {!filtersFromContacts.tags?.length && !filtersFromContacts.role && !filtersFromContacts.company && (
                        <span>All contacts</span>
                      )}
                    </div>
                  </div>
                )}
                {Object.keys(recipientFilters).length > 0 && !filtersFromContacts && (
                  <div className="text-sm text-gray-600 mt-2">
                    <div className="flex flex-wrap gap-2">
                      {recipientFilters.tags && recipientFilters.tags.length > 0 && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">Tags: {recipientFilters.tags.join(', ')}</span>
                      )}
                      {recipientFilters.role && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded">Role: {recipientFilters.role}</span>
                      )}
                      {recipientFilters.company && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded">Company: {recipientFilters.company}</span>
                      )}
                      {recipientFilters.dateRange && (
                        <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded">Created: {recipientFilters.dateRange}</span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={sendToAll}
                    onChange={(e) => {
                      setSendToAll(e.target.checked);
                      if (e.target.checked) {
                        setRecipientFilters({});
                      }
                    }}
                    className="mr-2"
                  />
                  Send to all subscribed contacts
                </label>

                {!sendToAll && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Tags</label>
                      <select
                        multiple
                        value={recipientFilters.tags || []}
                        onChange={(e) => setRecipientFilters({
                          ...recipientFilters,
                          tags: Array.from(e.target.selectedOptions, option => option.value)
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        size={5}
                      >
                        {allTags.map(tag => (
                          <option key={tag} value={tag}>{tag}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Role</label>
                      <select
                        value={recipientFilters.role || ''}
                        onChange={(e) => setRecipientFilters({
                          ...recipientFilters,
                          role: e.target.value || undefined
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="">All Roles</option>
                        {allRoles.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Company</label>
                      <select
                        value={recipientFilters.company || ''}
                        onChange={(e) => setRecipientFilters({
                          ...recipientFilters,
                          company: e.target.value || undefined
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="">All Companies</option>
                        {allCompanies.map(company => (
                          <option key={company} value={company}>{company}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Date</label>
                      <select
                        value={recipientFilters.dateRange || ''}
                        onChange={(e) => setRecipientFilters({
                          ...recipientFilters,
                          dateRange: e.target.value || undefined
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="">All Time</option>
                        <option value="today">Today</option>
                        <option value="lastHour">Last Hour</option>
                        <option value="last24Hours">Last 24 Hours</option>
                        <option value="lastWeek">Last Week</option>
                      </select>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add tags to recipients when campaign sends (optional)
                  </label>
                  <input
                    type="text"
                    value={campaignTagsToAdd}
                    onChange={(e) => setCampaignTagsToAdd(e.target.value)}
                    placeholder="Tags (comma-separated, e.g., Newsletter, Dec2025)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Campaign Details */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name *</label>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="e.g., Monthly Newsletter - January 2025"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject Line *</label>
              <input
                type="text"
                value={campaignSubject}
                onChange={(e) => setCampaignSubject(e.target.value)}
                placeholder="Email subject line"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Email Content with Preview */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Content (HTML) *</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-2">Edit HTML:</p>
                  <textarea
                    value={campaignHtml}
                    onChange={(e) => setCampaignHtml(e.target.value)}
                    rows={20}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
                    placeholder="<html><body><h1>Your email content here</h1></body></html>"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-2">Preview:</p>
                  <div 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white min-h-[400px] overflow-auto"
                    dangerouslySetInnerHTML={{ __html: campaignHtml || '<p class="text-gray-400">Preview will appear here</p>' }}
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Plain Text Version (optional)</label>
              <textarea
                value={campaignText}
                onChange={(e) => setCampaignText(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Plain text version for email clients that don't support HTML"
              />
            </div>

            {/* Bottom Actions */}
            <div className="flex gap-4 pt-6 border-t">
              <button
                onClick={handleSendTestEmail}
                disabled={sendingTest || !campaignSubject || !campaignHtml}
                className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
              >
                {sendingTest ? 'Sending...' : 'Send Test Email'}
              </button>
              <button
                onClick={() => handleSaveCampaign(true)}
                disabled={saving}
                className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save as Draft'}
              </button>
              <button
                onClick={() => {
                  const dateTime = prompt('Enter date and time (YYYY-MM-DD HH:MM):');
                  if (dateTime) {
                    setScheduleDateTime(dateTime);
                    // For now, just save as scheduled - full scheduling implementation would require backend changes
                    handleSaveCampaign(false);
                  }
                }}
                disabled={saving}
                className="px-6 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 disabled:opacity-50"
              >
                Schedule Send
              </button>
              <button
                onClick={handleSendNow}
                disabled={saving || sending || recipientCount === 0}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {sending ? 'Sending...' : 'Send Now'}
              </button>
            </div>
          </div>
        )}

        {/* Campaigns Tab */}
        {activeTab === 'campaigns' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Campaigns</h2>
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
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Created: {new Date(campaign.created_at).toLocaleDateString()}
                      {campaign.sent_at && ` | Sent: ${new Date(campaign.sent_at).toLocaleDateString()}`}
                      {campaign.sent_count > 0 && ` | Sent to ${campaign.sent_count} contacts`}
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
            <p className="text-gray-500">Analytics coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function EmailAdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div>Loading...</div></div>}>
      <EmailAdminContent />
    </Suspense>
  );
}
