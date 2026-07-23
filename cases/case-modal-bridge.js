(() => {
  if (window.parent === window) return;

  const getDocumentHeight = () =>
    Math.max(
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight,
      document.body?.scrollHeight || 0,
      document.body?.offsetHeight || 0,
    );

  const reportSize = () => {
    window.parent.postMessage(
      {
        type: "portfolio-case-size",
        height: getDocumentHeight(),
      },
      "*",
    );
  };

  window.addEventListener("load", reportSize);
  window.addEventListener("resize", reportSize);

  if ("ResizeObserver" in window) {
    const sizeObserver = new ResizeObserver(reportSize);
    sizeObserver.observe(document.documentElement);
    if (document.body) sizeObserver.observe(document.body);
  }

  reportSize();
})();
