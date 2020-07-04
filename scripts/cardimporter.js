import { imagesToJournalEntries } from "./img2journal.js";
import { pack2table } from "./pack2table.js";

export const log = (...args) => console.log("Card Importer | " + args);

Hooks.once("init", async () => {});
Hooks.once("setup", async () => {});
Hooks.once("ready", async () => {});

Hooks.on("renderJournalDirectory", (app, html, data) => {
  const deckImportButton = $(`<button class="importButton">Deck Import</button>`);

  html.find(".directory-footer").append(deckImportButton);

  let deckImportDialog = `
  <p> Folder Name: <input type="text" id="folderName"> </p>
  <p> Card Files: <input id="cardFiles" type="file" multiple="multiple" /> </p>
  <p> Target Folder (Must Exist): data/<input id="targetFolder" value="uploads/"> </p>
  `;

  deckImportButton.click((ev) => {
    new Dialog({
      title: game.i18n.localize("CardImport.DeckImportDialogTitle"),
      content: deckImportDialog,
      buttons: {
        Import: {
          label: game.i18n.localize("CardImport.Import"),
          callback: async (html) => {
            await imagesToJournalEntries(
              html.find("#folderName")[0].value,
              html.find("#targetFolder")[0].value,
              html.find("#cardFiles")[0].files
            );
          },
        },
        SDF: {
          label: game.i18n.localize("CardImport.SDFImport"),
          callback: (html) => {},
        },
        Cancel: {
          label: game.i18n.localize("CardImport.Cancel"),
        },
      },
    }).render(true);
  });
});

Hooks.on("renderRollTableDirectory", (app, html, data) => {
  const rollTableImportButton = $(`<button class="importButton">Roll Table Import</button>`);
  html.find(".directory-footer").append(rollTableImportButton);
  let rollTableDialog = `
  <h3> Compendium Label: <input id="packName" type="text"></h3>
  <h3> Roll Table Name: <input id="rollTableName" type="text"></h3>
  `;
  rollTableImportButton.click((ev) => {
    new Dialog({
      title: game.i18n.localize("CardImport.RollTableImportDialogTitle"),
      content: rollTableDialog,
      buttons: {
        Import: {
          label: game.i18n.localize("CardImport.Import"),
          callback: async (html) => {
            await pack2table(html.find("#packName")[0].value, html.find("#rollTableName")[0].value);
          },
        },
        Cancel: {
          label: game.i18n.localize("CardImport.Cancel"),
        },
      },
    }).render(true);
  });
});
