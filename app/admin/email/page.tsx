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

export default function EmailAdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('contacts');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [totalContactCount, setTotalContactCount] = useState<number>(0);
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

  // Fetch data on mount and tab changes
  useEffect(() => {
    if (activeTab === 'contacts') {
      fetchContacts();
      fetchAllTags();
      fetchAllRolesAndCompanies();
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
      if (filterSubscribed !== null) {
        params.append('subscribed', filterSubscribed.toString());
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
    // Pass current filters to compose tab
    setRecipientFilters({
      tags: selectedTags.length > 0 ? selectedTags : undefined,
      role: filterRole || undefined,
      company: filterCompany || undefined,
      dateRange: filterDateRange !== 'all' ? filterDateRange : undefined,
      subscribed: filterSubscribed !== null ? filterSubscribed : undefined,
      search: searchTerm || undefined,
    });
    setActiveTab('compose');
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
          <div className="bg-white rounded-lg shadow">
            {/* Primary Action Button - Always Visible */}
            <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-1">Ready to Send?</h2>
                  <p className="text-blue-100 text-sm">
                    {contacts.length} contact{contacts.length !== 1 ? 's' : ''} match your current filters
                  </p>
                </div>
                <button
                  onClick={handleCreateCampaignFromContacts}
                  disabled={contacts.length === 0}
                  className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  Create Campaign ({contacts.length} contacts)
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Filters */}
              <div className="mb-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                    <select
                      multiple
                      value={selectedTags}
                      onChange={(e) => setSelectedTags(Array.from(e.target.selectedOptions, option => option.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      size={4}
                    >
                      {allTags.map(tag => (
                        <option key={tag} value={tag}>{tag}</option>
                      ))}
                    </select>
                  </div>
                  <div>
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

              {/* Contact Count */}
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing <strong>{contacts.length.toLocaleString()}</strong> of <strong>{totalContactCount.toLocaleString()}</strong> total contacts
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAddContact(!showAddContact)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                  >
                    + Add Contact
                  </button>
                  <button
                    onClick={() => setShowImportModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                  >
                    📥 Import CSV
                  </button>
                </div>
              </div>

              {/* Manual Add Contact Form */}
              {showAddContact && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-semibold mb-3">Add New Contact</h3>
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
                        fetchContacts();
                        (e.target as HTMLFormElement).reset();
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
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                      <input type="email" name="email" required placeholder="Email *" className="px-3 py-2 border border-gray-300 rounded-md" />
                      <input type="text" name="firstName" placeholder="First Name" className="px-3 py-2 border border-gray-300 rounded-md" />
                      <input type="text" name="lastName" placeholder="Last Name" className="px-3 py-2 border border-gray-300 rounded-md" />
                      <input type="text" name="role" placeholder="Role" className="px-3 py-2 border border-gray-300 rounded-md" />
                      <input type="text" name="company" placeholder="Company" className="px-3 py-2 border border-gray-300 rounded-md" />
                      <div className="flex gap-2">
                        <input type="text" name="tags" placeholder="Tags (comma-separated)" className="flex-1 px-3 py-2 border border-gray-300 rounded-md" />
                        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
                          Add
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Bulk Actions */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold mb-3">Bulk Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Add Tags to Filtered Contacts</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={bulkTagInput}
                        onChange={(e) => setBulkTagInput(e.target.value)}
                        placeholder="Tags (comma-separated)"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                      />
                      <button
                        onClick={async () => {
                          if (!bulkTagInput.trim()) {
                            alert('Please enter tags');
                            return;
                          }
                          const tags = bulkTagInput.split(',').map(t => t.trim()).filter(t => t);
                          if (!confirm(`Add tags "${tags.join(', ')}" to ${contacts.length} contacts?`)) return;
                          
                          setBulkTagging(true);
                          try {
                            const filters: any = {};
                            if (selectedTags.length > 0) filters.tags = selectedTags;
                            if (filterSubscribed !== null) filters.subscribed = filterSubscribed;
                            if (filterRole) filters.role = filterRole;
                            if (filterCompany) filters.company = filterCompany;
                            if (filterDateRange !== 'all') filters.dateRange = filterDateRange;

                            const response = await fetch('/api/email/bulk-tag', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ tags, filters: Object.keys(filters).length > 0 ? filters : null }),
                            });
                            const data = await response.json();
                            if (data.success) {
                              alert(`Successfully tagged ${data.updated} contacts`);
                              setBulkTagInput('');
                              fetchAllTags();
                              fetchContacts();
                            } else {
                              alert(data.error || 'Failed to tag contacts');
                            }
                          } catch (error: any) {
                            alert(`Error: ${error.message}`);
                          } finally {
                            setBulkTagging(false);
                          }
                        }}
                        disabled={bulkTagging || !bulkTagInput.trim()}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                      >
                        {bulkTagging ? 'Tagging...' : 'Add Tags'}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quick Tag Recent</label>
                    <button
                      onClick={async () => {
                        const tagName = prompt('Enter tag name (e.g., "Dec 10"):');
                        if (!tagName) return;
                        if (!confirm(`Tag all contacts from last hour with "${tagName}"?`)) return;
                        
                        setBulkTagging(true);
                        try {
                          const response = await fetch('/api/email/tag-recent', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ tags: [tagName], hours: 1 }),
                          });
                          const data = await response.json();
                          if (data.success) {
                            alert(data.message);
                            fetchAllTags();
                            fetchContacts();
                          } else {
                            alert(data.error || 'Failed to tag');
                          }
                        } catch (error: any) {
                          alert(`Error: ${error.message}`);
                        } finally {
                          setBulkTagging(false);
                        }
                      }}
                      disabled={bulkTagging}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                      {bulkTagging ? 'Tagging...' : 'Tag Recent (Last Hour)'}
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CSV Actions</label>
                    <div className="flex gap-2">
                      <input
                        type="file"
                        accept=".csv"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setLoading(true);
                          const formData = new FormData();
                          formData.append('file', file);
                          try {
                            const response = await fetch('/api/email/import-contacts', { method: 'POST', body: formData });
                            const data = await response.json();
                            if (data.success) {
                              alert(`Imported ${data.imported} contacts, updated ${data.updated}`);
                              fetchAllTags();
                              fetchContacts();
                            } else {
                              alert(data.error || 'Import failed');
                            }
                          } catch (error) {
                            alert('Import error');
                          } finally {
                            setLoading(false);
                            e.target.value = '';
                          }
                        }}
                        className="hidden"
                        id="csv-import"
                      />
                      <label htmlFor="csv-import" className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer text-center text-sm">
                        Import CSV
                      </label>
                      <a href="/email-contacts-template.csv" download className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm">
                        Download Template
                      </a>
                    </div>
                  </div>
                </div>
              </div>

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
                            {contact.tags?.join(', ') || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              contact.subscribed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {contact.subscribed ? 'Subscribed' : 'Unsubscribed'}
                            </span>
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
                {Object.keys(recipientFilters).length > 0 && (
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
