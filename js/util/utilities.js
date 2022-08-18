// Create Elements
export function createEl({ tagName, attrs = null, content = '' }) {
  const el = document.createElement(tagName);
  if (attrs)
    attrs.forEach(({ key, value }) => el.setAttribute(key, value));
  if (typeof content === 'string')
    el.append(document.createTextNode(content));
  else
    content.forEach(cont => el.append(createEl(cont)));
  return el;
};

// Generate Unique Random Numbers
export function getUniqueRandNum(valuesNumber, rang) {
  const values = [];
  while (values.length < valuesNumber) {
    const random = Math.floor(Math.random() * rang);
    if (values.indexOf(random) === -1) values.push(random);
  }
  return values;
};