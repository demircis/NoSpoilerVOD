// Saves options to chrome.storage
function save_options() {
  var blurAndMute = document.getElementById('blurAndMute').checked;
  chrome.storage.sync.set({
    blurAndMute: blurAndMute
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    blurAndMute: false
  }, function(items) {
    document.getElementById('blurAndMute').checked = items.blurAndMute;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
