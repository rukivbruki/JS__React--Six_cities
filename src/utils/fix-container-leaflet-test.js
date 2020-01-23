export default function fixContainerLeafletTest() {
  if (fixContainerLeafletTest.map) {
    global.document.body.removeChild(fixContainerLeafletTest.map);
  }
  const div = global.document.createElement(`div`);
  div.setAttribute(`id`, `map`);
  fixContainerLeafletTest.map = global.document.body.appendChild(div);
}
