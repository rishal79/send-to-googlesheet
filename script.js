const scriptURL = 'YOUR_SCRIPT_URL_HERE';
// PASTE YOUR SCRIPT URL HERE
  
document.getElementById('contactForm').addEventListener('submit', function (e) {
e.preventDefault();

const form = new FormData(this);
const submitBtn = this.querySelector('button[type="submit"]');
submitBtn.disabled = true;
submitBtn.textContent = 'Sending...';

fetch(scriptURL, {
method: 'POST',
body: form
})
.then(response => response.text())
.then(result => {
  alert('✅ Message sent!');
  this.reset();
})
.catch(error => {
  console.error('❌ Submission error:', error.message);
  alert('❌ Failed to send message. Please try again.');
})
.finally(() => {
  submitBtn.disabled = false;
  submitBtn.textContent = 'Send';
});
});
