const { Notion } = require("@neurosity/notion");
const { Output: Midi } = require("easymidi");
const { email, password } = require("./auth");
const { tween } = require("./utils/tween");

(async function main() {
  const notion = new Notion();
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
