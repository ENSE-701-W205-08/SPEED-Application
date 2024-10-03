import('bootstrap/dist/js/bootstrap.bundle.min')
.then(() => {
  console.log('Bootstrap JS loaded');
})
.catch((err) => console.error('Error loading Bootstrap JS:', err));