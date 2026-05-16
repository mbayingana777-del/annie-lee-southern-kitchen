// ─────────────────────────────────────────────
// ANNIE LEE'S SHARED CONNECTION SYSTEM
// ─────────────────────────────────────────────

const supabaseUrl = 'https://mjzqchvmohkiwsiczwwr.supabase.co';

const supabaseKey =
'public-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qenFjaHZtb2hraXdzaWN6d3dyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2OTk4MDYsImV4cCI6MjA5NDI3NTgwNn0.6Eo27LHKncx1_onHH71rLXjOZsgA9dy0wQBVM-WEY3M';

const supabaseClient = supabase.createClient(
  supabaseUrl,
  supabaseKey
);

console.log('Lead Capture Connected');

// ─────────────────────────────────────────────
// SAVE LEAD TO SUPABASE
// ─────────────────────────────────────────────

async function saveLeadToSupabase(leadData) {

  const payload = {
    name: leadData.name || '',
    phone: leadData.phone || '',
    email: leadData.email || '',
    event_date: leadData.event_date || '',
    message: leadData.message || '',
    source: leadData.source || 'Website'
  };

  const { data, error } = await supabaseClient
    .from('catering_leads')
    .insert([payload]);

  if (error) {
    console.error('SUPABASE ERROR:', error);
    alert('Error saving request.');
    return false;
  }

  console.log('Lead saved:', data);

  return true;
}

// ─────────────────────────────────────────────
// GENERIC FORM HANDLER
// ─────────────────────────────────────────────

async function handleLeadSubmit(event) {

  event.preventDefault();

  const form = event.target;

  const formData = new FormData(form);

  const leadData = {
    name: formData.get('name') || '',
    phone: formData.get('phone') || '',
    email: formData.get('email') || '',
    event_date: formData.get('event_date') || '',
    message:
  formData.get('message') ||
  formData.get('details') ||
  formData.get('notes') ||
  '',
    source: formData.get('source') || 'Website'
  };

  const success = await saveLeadToSupabase(leadData);

  if (success) {
    alert('Request submitted successfully!');
    form.reset();
  }
}

// ─────────────────────────────────────────────
// CATERING FORM HANDLER
// ─────────────────────────────────────────────

async function handleCateringSubmitGHL(event) {

  event.preventDefault();

  const form = event.target;

  const formData = new FormData(form);

  const leadData = {
    name: formData.get('name') || '',
    phone: formData.get('phone') || '',
    email: formData.get('email') || '',
    event_date: formData.get('event_date') || '',
    message: formData.get('message') || '',
    source: 'Catering Page'
  };

  const success = await saveLeadToSupabase(leadData);

  if (success) {
    alert('Catering request submitted!');
    form.reset();
  }
}
