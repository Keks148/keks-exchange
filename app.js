const tabs = document.querySelectorAll('.tab');
const pages = document.querySelectorAll('.page');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    pages.forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});
