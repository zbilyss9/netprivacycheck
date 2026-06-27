document.querySelectorAll('.faq-item h3').forEach(item => {
  item.addEventListener('click', () => {
    item.parentElement.classList.toggle('open');
  });
});

document.getElementById('ip-value').textContent = "203.0.113.42";
document.getElementById('ip-location').textContent = "Athens, Greece";
document.getElementById('ip-isp').textContent = "Example ISP";
