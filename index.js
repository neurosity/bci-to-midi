const { Notion } = require("@neurosity/notion");
const { Output: Midi } = require("easymidi");
const { tween } = require("./utils/tween");
const { deviceId, email, password } = require("./options");

(async function main() {
  const notion = new Notion({ deviceId });
  await notion.login({ email, password });

  const midi = new Midi("Notion", true);

  notion
    .calm()
    .pipe(tween({ to: [0, 254] }))
    .subscribe((value) => {
      midi.send("cc", { value });
      console.log({ value });
    });
})();
