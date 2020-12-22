import 'bootstrap/js/src/scrollspy';
import 'bootstrap/js/src/collapse';

declare global {
  interface Window { navigate(tag: string): boolean }
}

$(() => {
  window.navigate = tag => {
    $('.collapse').collapse('hide');
    $(tag)[0].scrollIntoView();
    return false;
  };

  window.history.replaceState(null, '', new URL(document.URL).pathname);
});
