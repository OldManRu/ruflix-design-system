function ruflixCards() {
  return Array.from(document.querySelectorAll('.row .card'));
}

function ruflixVisibleShelves() {
  return Array.from(document.querySelectorAll('.shelf')).filter((shelf) => {
    return !shelf.classList.contains('hidden') && !shelf.classList.contains('leaving');
  });
}

function ruflixSetFocusedCard(card) {
  if (!card) return;
  document.querySelectorAll('.card.is-focused').forEach((el) => el.classList.remove('is-focused'));
  card.classList.add('is-focused');
  card.focus({ preventScroll: true });
  card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

function ruflixMoveFocus(horizontal, vertical) {
  const current = document.querySelector('.card.is-focused') || document.activeElement.closest?.('.card') || document.querySelector('.row .card');
  if (!current) return;

  const currentRow = current.closest('.row');
  const currentShelf = current.closest('.shelf');
  const rowCards = Array.from(currentRow.querySelectorAll('.card'));
  const currentIndex = rowCards.indexOf(current);

  if (horizontal) {
    const nextIndex = Math.max(0, Math.min(rowCards.length - 1, currentIndex + horizontal));
    ruflixSetFocusedCard(rowCards[nextIndex]);
    return;
  }

  if (vertical) {
    const shelves = ruflixVisibleShelves();
    const shelfIndex = shelves.indexOf(currentShelf);
    const targetIndex = Math.max(0, Math.min(shelves.length - 1, shelfIndex + vertical));
    const targetCards = Array.from(shelves[targetIndex].querySelectorAll('.card'));
    ruflixSetFocusedCard(targetCards[Math.min(currentIndex, targetCards.length - 1)] || targetCards[0]);
  }
}

function ruflixPrimeFocus() {
  const firstCard = document.querySelector('#continueRow .card, #recentRow .card, .row .card');
  if (firstCard && !document.querySelector('.card.is-focused')) ruflixSetFocusedCard(firstCard);
}

document.addEventListener('focusin', (event) => {
  const card = event.target.closest?.('.card');
  if (!card) return;
  document.querySelectorAll('.card.is-focused').forEach((el) => el.classList.remove('is-focused'));
  card.classList.add('is-focused');
});

document.addEventListener('pointerenter', (event) => {
  const card = event.target.closest?.('.card');
  if (!card) return;
  document.querySelectorAll('.card.is-focused').forEach((el) => el.classList.remove('is-focused'));
  card.classList.add('is-focused');
}, true);

window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); ruflixMoveFocus(-1, 0); }
  if (event.key === 'ArrowRight') { event.preventDefault(); ruflixMoveFocus(1, 0); }
  if (event.key === 'ArrowUp') { event.preventDefault(); ruflixMoveFocus(0, -1); }
  if (event.key === 'ArrowDown') { event.preventDefault(); ruflixMoveFocus(0, 1); }
});

const ruflixFocusObserver = new MutationObserver(() => window.requestAnimationFrame(ruflixPrimeFocus));
ruflixFocusObserver.observe(document.body, { childList: true, subtree: true });
window.requestAnimationFrame(ruflixPrimeFocus);
