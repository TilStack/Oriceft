/**
 * FILIERE.JS — Université de Bertoua  (v2)
 * Features:
 *   1. Tab switching (Générale / Technique / Commerciale)
 *   2. Accordion groups on the left sidebar
 *   3. Sub-item click → animated content swap on the right
 *   4. Entrance animations on load
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────
     1. TAB SWITCHING
  ───────────────────────────────────────── */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      panels.forEach(p => { p.classList.remove('active'); p.style.display = 'none'; });

      const targetPanel = document.getElementById(`panel-${target}`);
      if (!targetPanel) return;

      targetPanel.style.display = '';
      requestAnimationFrame(() => targetPanel.classList.add('active'));
      resetPanel(targetPanel);
    });
  });


  /* ─────────────────────────────────────────
     2. ACCORDION GROUPS (left sidebar header)
  ───────────────────────────────────────── */
  document.querySelectorAll('.dept-item.has-sub').forEach(header => {
    header.addEventListener('click', () => {
      const group = header.closest('.dept-group');
      const subList = group.querySelector('.sub-list');
      const panel = header.closest('.panel');
      const isOpen = subList.classList.contains('open');

      if (isOpen) {
        // close this group
        subList.classList.remove('open');
        header.classList.remove('active-group');
      } else {
        // close sibling groups in same panel
        panel.querySelectorAll('.dept-group').forEach(g => {
          g.querySelector('.sub-list')?.classList.remove('open');
          g.querySelector('.dept-item')?.classList.remove('active-group');
        });
        // open this one
        subList.classList.add('open');
        header.classList.add('active-group');

        // Auto-select the first sub-item if none active yet
        const firstSub = subList.querySelector('.sub-item');
        if (firstSub && !subList.querySelector('.sub-item.active')) {
          activateSubItem(firstSub, panel);
        }
      }
    });
  });


  /* ─────────────────────────────────────────
     3. SUB-ITEM CLICK → content swap
  ───────────────────────────────────────── */
  document.querySelectorAll('.sub-item').forEach(item => {
    item.addEventListener('click', () => {
      const panel = item.closest('.panel');
      activateSubItem(item, panel);
    });
  });

  function activateSubItem(item, panel) {
    const targetId = item.dataset.target;
    const nextInfo = panel.querySelector(`#${targetId}`);
    const curInfo = panel.querySelector('.dept-info.active');

    if (!nextInfo || nextInfo === curInfo) return;

    // Deactivate all sub-items in this panel
    panel.querySelectorAll('.sub-item').forEach(s => s.classList.remove('active'));
    item.classList.add('active');

    // Exit animation then swap
    if (curInfo) {
      curInfo.classList.add('exit');
      curInfo.addEventListener('animationend', () => {
        curInfo.classList.remove('active', 'exit');
      }, { once: true });
    }

    setTimeout(() => { nextInfo.classList.add('active'); }, 85);
  }


  /* ─────────────────────────────────────────
     4. HELPERS
  ───────────────────────────────────────── */
  function resetPanel(panel) {
    // Close all sub-lists
    panel.querySelectorAll('.sub-list').forEach(s => s.classList.remove('open'));
    panel.querySelectorAll('.dept-item').forEach(d => d.classList.remove('active-group'));
    panel.querySelectorAll('.sub-item').forEach(s => s.classList.remove('active'));
    panel.querySelectorAll('.dept-info').forEach(i => i.classList.remove('active', 'exit'));

    // Open first group and activate its first sub-item
    const firstGroup = panel.querySelector('.dept-group');
    if (!firstGroup) return;
    const firstHeader = firstGroup.querySelector('.dept-item');
    const firstSub = firstGroup.querySelector('.sub-list');
    const firstItem = firstGroup.querySelector('.sub-item');
    const firstInfo = firstItem ? panel.querySelector(`#${firstItem.dataset.target}`) : null;

    firstHeader?.classList.add('active-group');
    firstSub?.classList.add('open');
    firstItem?.classList.add('active');
    firstInfo?.classList.add('active');
  }


  /* ─────────────────────────────────────────
     5. ENTRANCE ANIMATIONS (page load)
  ───────────────────────────────────────── */
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.cssText = 'opacity:0;transform:translateY(22px);transition:opacity .7s ease,transform .7s ease';
    setTimeout(() => { heroContent.style.opacity = '1'; heroContent.style.transform = 'translateY(0)'; }, 120);
  }

  tabBtns.forEach((btn, i) => {
    btn.style.cssText = `opacity:0;transform:translateY(14px);transition:opacity .5s ease ${0.3 + i * 0.1}s,transform .5s ease ${0.3 + i * 0.1}s`;
    setTimeout(() => { btn.style.opacity = '1'; btn.style.transform = 'translateY(0)'; }, 200);
  });

});
