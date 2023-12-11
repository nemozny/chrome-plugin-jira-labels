// Saves options to chrome.storage
const saveOptions = () => {
  const work_category = document.getElementById('work_category').value;
  const feature_type = document.getElementById('feature_type').value;

  chrome.storage.sync.set(
    { workCategory : work_category, featureType : feature_type },
    () => {
      // Update status to let user know options were saved.
      const status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(() => {
        status.textContent = '';
      }, 750);
    }
  );
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.sync.get(
    { workCategory: "customfield_10204", featureType: "customfield_10205" },
    (items) => {
      document.getElementById('work_category').value = items.workCategory;
      document.getElementById('feature_type').value = items.featureType;
    }
  );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);