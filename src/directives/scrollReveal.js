const createObserver = (el, binding) => {
  const options = {
    threshold: binding?.value?.threshold ?? 0.2,
    rootMargin: binding?.value?.margin ?? '0px',
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        el.classList.add('reveal-visible')
        if (binding?.value?.once !== false) observer.unobserve(entry.target)
      }
    })
  }, options)

  observer.observe(el)
  return observer
}

export const scrollReveal = {
  mounted(el, binding) {
    el.classList.add('reveal-init')
    el.__observer = createObserver(el, binding)
  },
  unmounted(el) {
    el.__observer?.disconnect()
  },
}
