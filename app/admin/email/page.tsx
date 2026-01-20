'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

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
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('contacts');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [tagsLoading, setTagsLoading] = useState(false);
  const [filterSubscribed, setFilterSubscribed] = useState<boolean | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Campaign composer state
  const [campaignName, setCampaignName] = useState('');
  const [campaignSubject, setCampaignSubject] = useState('');
  const [campaignHtml, setCampaignHtml] = useState('');
  const [campaignText, setCampaignText] = useState('');
  const [selectedContactTags, setSelectedContactTags] = useState<string[]>([]);
  const [sendToAll, setSendToAll] = useState(false);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [editTags, setEditTags] = useState<string>('');

  // Analytics state
  const [analytics, setAnalytics] = useState<any>(null);
  
  // Blocked contacts state
  const [showBlockedOnly, setShowBlockedOnly] = useState(false);

  // Bulk operations state
  const [selectedContactIds, setSelectedContactIds] = useState<number[]>([]);
  const [bulkTagInput, setBulkTagInput] = useState<string>('');
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Real-time subscription ref
  const subscriptionRef = useRef<any>(null);

  // Fetch all tags once when component mounts or when contacts tab is active
  useEffect(() => {
    if (activeTab === 'contacts') {
      // Always fetch tags fresh on page load (no caching)
      fetchAllTags();
      
      // Set up real-time subscription for email_contacts table
      if (typeof window !== 'undefined') {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        
        if (supabaseUrl && supabaseAnonKey) {
          try {
            const supabase = createClient(supabaseUrl, supabaseAnonKey);
            
            // Subscribe to changes in email_contacts
            subscriptionRef.current = supabase
              .channel('email_contacts_changes')
              .on(
                'postgres_changes',
                {
                  event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
                  schema: 'public',
                  table: 'email_contacts',
                },
                (payload) => {
                  console.log('Real-time update detected:', payload);
                  // Refresh tags when tags column changes
                  if (payload.new?.tags || payload.old?.tags) {
                    console.log('Tags changed, refreshing tag list...');
                    fetchAllTags();
                  }
                  // Always refresh contacts
                  fetchContacts();
                }
              )
              .subscribe();
            
            console.log('✅ Real-time subscription active for email_contacts');
          } catch (error) {
            console.error('Error setting up real-time subscription:', error);
          }
        }
      }
      
      // Also refresh tags every 30 seconds to catch new tags added directly in database
      const interval = setInterval(() => {
        console.log('Auto-refreshing tags (30s interval)...');
        fetchAllTags();
      }, 30000); // 30 seconds
      
      // Cleanup function
      return () => {
        clearInterval(interval);
        if (subscriptionRef.current) {
          subscriptionRef.current.unsubscribe();
          subscriptionRef.current = null;
          console.log('Real-time subscription cleaned up');
        }
      };
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
  }, [selectedTags, filterSubscribed, searchTerm, showBlockedOnly]);

  const fetchAllTags = async (showLoading = true) => {
    if (showLoading) {
      setTagsLoading(true);
    }
    try {
      console.log('🔄 Fetching all tags from API (fresh, no cache)...');
      // Use the optimized tags endpoint with cache-busting - always fetch fresh
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/email/tags?t=${timestamp}`, {
        cache: 'no-store',
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      console.log('Tags API response:', {
        success: data.success,
        tagCount: data.tags?.length || 0,
        totalCount: data.count || 0,
        sampleTags: data.tags?.slice(0, 10) || [],
      });
      
      if (data.success && data.tags && Array.isArray(data.tags)) {
        console.log(`✅ Loaded ${data.tags.length} unique tags from database`);
        console.log('All tags:', data.tags);
        if (data.debug) {
          console.log('Debug info:', data.debug);
        }
        // Verify "Program" tag
        if (data.tags.includes('Program')) {
          console.log('✅ "Program" tag is in the response');
        } else {
          console.warn('⚠️ "Program" tag is NOT in the response!');
          console.warn('Available tags:', data.tags);
        }
        setAllTags(data.tags);
      } else {
        console.warn('No tags or invalid response:', data);
        // Fallback: try fetching from contacts
        const fallbackResponse = await fetch('/api/email/contacts?limit=5000');
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
          const sortedTags = Array.from(tags).sort();
          setAllTags(sortedTags);
        } else {
          setAllTags([]);
        }
      }
    } catch (error) {
      console.error('❌ Error fetching tags:', error);
      // Try fallback on error
      try {
        const fallbackResponse = await fetch('/api/email/contacts?limit=5000');
        const fallbackData = await fallbackResponse.json();
        if (fallbackData.success && fallbackData.contacts) {
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
          const sortedTags = Array.from(tags).sort();
          console.log(`✅ Fallback: Loaded ${sortedTags.length} tags from contacts`);
          setAllTags(sortedTags);
        }
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
        setAllTags([]);
      }
    } finally {
      if (showLoading) {
        setTagsLoading(false);
      }
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
      // Increase limit for contacts view
      params.append('limit', '1000');

      const response = await fetch(`/api/email/contacts?${params.toString()}`);
      const data = await response.json();
      
      console.log('Contacts API response:', { 
        success: data.success, 
        count: data.contacts?.length || 0,
        error: data.error 
      });
      
      if (data.success) {
        setContacts(data.contacts || []);
      } else {
        console.error('Failed to fetch contacts:', data.error);
        alert(data.error || 'Failed to fetch contacts');
        setContacts([]);
      }
    } catch (error: any) {
      console.error('Error fetching contacts:', error);
      alert(`Error fetching contacts: ${error.message || 'Unknown error'}`);
      setContacts([]);
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

  const handleAddTag = async (contactId: number, tag: string) => {
    if (!tag || !tag.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/email/contacts/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contactId, tag: tag.trim() }),
      });
      const data = await response.json();
      if (data.success) {
        fetchAllTags();
        fetchContacts();
      } else {
        alert(data.error || 'Failed to add tag');
      }
    } catch (error) {
      alert('Error adding tag');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveTag = async (contactId: number, tag: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/email/contacts/tags?contactId=${contactId}&tag=${encodeURIComponent(tag)}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        fetchAllTags();
        fetchContacts();
      } else {
        alert(data.error || 'Failed to remove tag');
      }
    } catch (error) {
      alert('Error removing tag');
    } finally {
      setLoading(false);
    }
  };

  const handleBulkTagOperation = async (action: 'add' | 'remove') => {
    if (selectedContactIds.length === 0) {
      alert('Please select at least one contact');
      return;
    }

    if (!bulkTagInput.trim()) {
      alert('Please enter a tag');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/email/contacts/bulk-tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactIds: selectedContactIds,
          tag: bulkTagInput.trim(),
          action,
        }),
      });
      const data = await response.json();
      if (data.success) {
        alert(`${action === 'add' ? 'Added' : 'Removed'} tag "${bulkTagInput.trim()}" from ${data.updated} contact(s)`);
        setBulkTagInput('');
        setSelectedContactIds([]);
        setShowBulkActions(false);
        fetchAllTags();
        fetchContacts();
      } else {
        alert(data.error || `Failed to ${action} tag`);
      }
    } catch (error) {
      alert(`Error ${action}ing tag`);
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
    if (selectedContactIds.length === contacts.length) {
      setSelectedContactIds([]);
    } else {
      setSelectedContactIds(contacts.map(c => c.id));
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
        const message = `Successfully imported ${data.imported} new contacts, updated ${data.updated} existing contacts.${data.errors > 0 ? ` ${data.errors} errors occurred.` : ''}`;
        alert(message);
        if (data.errorDetails && data.errorDetails.length > 0) {
          console.error('Import errors:', data.errorDetails);
        }
        fetchAllTags(); // Refresh tags list
        fetchContacts();
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
      const response = await fetch('/api/email/send-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId,
          tagFilters: sendToAll ? [] : selectedContactTags,
          sendImmediately: true,
        }),
      });
      const data = await response.json();
      if (data.success) {
        alert(`Campaign sent! ${data.sent} emails sent successfully.`);
        fetchCampaigns();
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
      if (data.success && data.campaign) {
        // Redirect to editor page
        router.push(`/admin/email/campaigns/edit/${data.campaign.id}`);
      } else {
        alert(data.error || 'Failed to duplicate campaign');
      }
    } catch (error) {
      alert('Error duplicating campaign');
    } finally {
      setLoading(false);
    }
  };

  const handleEditCampaign = (campaignId: number) => {
    router.push(`/admin/email/campaigns/edit/${campaignId}`);
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
              <div className="w-full">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Tags {allTags.length > 0 && `(${allTags.length})`}
                    {tagsLoading && <span className="ml-2 text-xs text-gray-500">(Loading...)</span>}
                  </label>
                  <div className="flex gap-2 items-center">
                    {selectedTags.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setSelectedTags([])}
                        className="text-xs text-blue-600 hover:text-blue-800 underline"
                      >
                        Clear filters
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => fetchAllTags(true)}
                      disabled={tagsLoading}
                      className="text-xs text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 px-2 py-1 border border-blue-300 rounded hover:bg-blue-50 transition-colors"
                      title="Refresh tags from database"
                    >
                      {tagsLoading ? (
                        <>
                          <span className="animate-spin">⟳</span> Refreshing...
                        </>
                      ) : (
                        <>
                          🔄 Refresh
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-md min-h-[60px]">
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
                    <span className="text-sm text-gray-500">No tags found. Click refresh or add tags to contacts.</span>
                  )}
                </div>
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

            {/* Bulk Actions Bar */}
            {selectedContactIds.length > 0 && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700">
                      {selectedContactIds.length} contact{selectedContactIds.length !== 1 ? 's' : ''} selected
                    </span>
                    <button
                      onClick={() => {
                        setSelectedContactIds([]);
                        setShowBulkActions(false);
                      }}
                      className="text-sm text-gray-600 hover:text-gray-800"
                    >
                      Clear selection
                    </button>
                  </div>
                  {!showBulkActions ? (
                    <button
                      onClick={() => setShowBulkActions(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                    >
                      Bulk Tag Actions
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={bulkTagInput}
                        onChange={(e) => setBulkTagInput(e.target.value)}
                        placeholder="Enter tag name"
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && bulkTagInput.trim()) {
                            handleBulkTagOperation('add');
                          }
                        }}
                      />
                      <button
                        onClick={() => handleBulkTagOperation('add')}
                        disabled={!bulkTagInput.trim() || loading}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 text-sm"
                      >
                        Add Tag
                      </button>
                      <button
                        onClick={() => handleBulkTagOperation('remove')}
                        disabled={!bulkTagInput.trim() || loading}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 text-sm"
                      >
                        Remove Tag
                      </button>
                      <button
                        onClick={() => {
                          setShowBulkActions(false);
                          setBulkTagInput('');
                        }}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Contacts Table */}
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        <input
                          type="checkbox"
                          checked={selectedContactIds.length === contacts.length && contacts.length > 0}
                          onChange={toggleSelectAll}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </th>
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
                      <tr key={contact.id} className={selectedContactIds.includes(contact.id) ? 'bg-blue-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedContactIds.includes(contact.id)}
                            onChange={() => toggleContactSelection(contact.id)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
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
                        <td className="px-6 py-4 text-sm text-gray-500">
                          <div className="flex flex-wrap items-center gap-2 max-w-md">
                            {contact.tags && contact.tags.length > 0 ? (
                              <>
                                {contact.tags.map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                                  >
                                    {tag}
                                    <button
                                      onClick={() => handleRemoveTag(contact.id, tag)}
                                      className="hover:text-blue-600 focus:outline-none"
                                      title="Remove tag"
                                    >
                                      ×
                                    </button>
                                  </span>
                                ))}
                                <button
                                  onClick={() => {
                                    const newTag = prompt('Enter new tag:');
                                    if (newTag && newTag.trim()) {
                                      handleAddTag(contact.id, newTag.trim());
                                    }
                                  }}
                                  className="text-blue-600 hover:text-blue-900 text-xs font-medium"
                                  title="Add tag"
                                >
                                  + Add Tag
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => {
                                  const newTag = prompt('Enter new tag:');
                                  if (newTag && newTag.trim()) {
                                    handleAddTag(contact.id, newTag.trim());
                                  }
                                }}
                                className="text-blue-600 hover:text-blue-900 text-xs font-medium"
                                title="Add tag"
                              >
                                + Add Tag
                              </button>
                            )}
                          </div>
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
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={sendToAll}
                      onChange={(e) => setSendToAll(e.target.checked)}
                      className="mr-2"
                    />
                    Send to all subscribed contacts
                  </label>
                  {!sendToAll && (
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Or select by tags:</label>
                      <select
                        multiple
                        value={selectedContactTags}
                        onChange={(e) => setSelectedContactTags(Array.from(e.target.selectedOptions, option => option.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        {allTags.map(tag => (
                          <option key={tag} value={tag}>{tag}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
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
                      {campaign.status === 'draft' && (
                        <button
                          onClick={() => handleEditCampaign(campaign.id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                          title="Edit this campaign"
                        >
                          Edit
                        </button>
                      )}
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

