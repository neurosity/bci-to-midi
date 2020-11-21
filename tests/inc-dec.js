const { Notion } = require("@neurosity/notion");
const { Output: Midi } = require("easymidi");
const { deviceId, email, password } = require("../options");

(async function main() {
  const notion = new Notion({ deviceId });
  const midi = new Midi("Notion", true);

  await notion.login({ email, password });

  let prevFocus = 0;
  notion.focus().subscribe((focus) => {
    let nextFocus = focus.probability;
    midi.send("program", {
      number: nextFocus > prevFocus ? 4 : 3,
      channel: 0
    });
    prevFocus = nextFocus;
    console.log({ prevFocus, nextFocus });
  });
})();
