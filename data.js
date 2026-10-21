// Data otevřené stránky Školy matiky. Nová přednáška = řádek v LESSONS, id v SECTIONS (nahoru = nejnovější),
// náhled media/snimky/<id>.jpg (léto lekce-NN, podzim podzim-NN), případně ukázka v PREVIEWS. Postup: README.md.

// Kam vede přihlášení. Až bude vložená platba z Flixy, nahradí box .embed v modalu.
const JOIN_URL = "https://vojtakloud.com/p/p-ihla-se-do-letn-koly-matiky-s-vojtou-nko2ex6tt";

// Vložená platba z Flixy: Můj obchod → Škola matiky → Možnosti → Embed platebního formuláře (experimentální).
// Zapnutá ve Flixy 21. 10. 2026: „Povolit“, přesměrování po nákupu https://skola.vojtakloud.com/dekujeme.html,
// stránky s formulářem https://skola.vojtakloud.com. enabled: false vrátí zástupný box a odkaz na Flixy.
// Poplatek (Vyúčtování, 21. 10. 2026): 2,9 % + 12 Kč za objednávku přes embed, nahrazuje 1,9 % tarifu PRO.
const CHECKOUT = { enabled: true, pageId: "cuq1koy1sau67w1yso6zkxpmb", script: "https://moje.flixy.cz/embed/v1/checkout.js" };

// Počty lidí ve škole. Stránka je bere živě z automatiky přístupů (Apps Script, list Objednávky, obnova do hodiny);
// když se nenačtou, použije total a active odtud (ruční záloha, postup v marketing\snem-2026-10-19\SOUHRN.md).
// total = různí předplatitelé od 1. 7. (jen roste), active = aktivní bez zrušení.
// show: "total", "active", nebo "auto" = celkový počet, dokud aktuální nedosáhne activeFrom, pak aktuální.
const MEMBERS = {
  total: 82, active: 35, asOf: "19. 10. 2026",
  url: "https://script.google.com/macros/s/AKfycbw2bl44rErHdZxOkjOy-179hPoNK8M2zv9CH0pOVVivPWAMDnHehcB1QIVfZtTnrh2D/exec?pocty=1",
  show: "auto", activeFrom: 60,
  labelTotal: "lidí ve škole od července",
  labelActive: "lidí je teď ve škole",
};

// Letní přednášky (názvy podle souborů na Disku a postů v komunitě, délky z videí).
const LESSONS = {
  "01": { date: "7. 7.",  title: "Úvod, logika", min: 68, topics: "Jazyk matematiky a logika" },
  "02": { date: "9. 7.",  title: "Matematická indukce", min: 63, topics: "Důkaz indukcí" },
  "03": { date: "14. 7.", title: "Posloupnosti a jejich limity", min: 69, topics: "Jak matika pracuje s nekonečnem" },
  "04": { date: "19. 7.", title: "Existenční věty a nekonečné řady", min: 67, topics: "Číslo e, babylonská metoda, mocninné řady" },
  "05": { date: "21. 7.", title: "Spojitost a derivace", min: 56, topics: "Co znamená, že je funkce spojitá, a první derivace" },
  "06": { date: "23. 7.", title: "Derivace a pravidla pro jejich výpočty", min: 64, topics: "Pravidla derivování" },
  "07": { date: "28. 7.", title: "Aplikace derivací", min: 77, topics: "Snellův zákon z Fermatova principu" },
  "08": { date: "30. 7.", title: "Integrály neurčité", min: 61, topics: "Primitivní funkce" },
  "09": { date: "4. 8.",  title: "Integrály určité", min: 69, topics: "Plocha pod křivkou" },
  "10": { date: "6. 8.",  title: "Diferenciální rovnice", min: 67, topics: "Oscilátor a e na iφ" },
  "11": { date: "11. 8.", title: "Diferenciální rovnice ještě", min: 77, topics: "Parabola ze zákona odrazu" },
  "12": { date: "13. 8.", title: "Funkce více proměnných, Gamma", min: 63, topics: "Gradient, regrese, funkce Gamma" },
  "13": { date: "19. 8.", title: "Integrály s parametrem, řetízkové pravidlo", min: 61, topics: "Feynmanův trik a Gaussův integrál" },
  "14": { date: "20. 8.", title: "Variační počet", min: 63, topics: "Euler-Lagrangeova rovnice" },
  "15": { date: "26. 8.", title: "Brachistochrona", min: 58, topics: "Po jaké křivce sjedeš nejrychleji" },
  "16": { date: "27. 8.", title: "Lagrangeovy multiplikátory", min: 80, topics: "Extrémy s podmínkou" },
  "17": { date: "3. 9.",  title: "Variační počet s omezeními", min: 41, topics: "Řetězovka" },
  // Podzim: názvy podle zápisků na Disku (DOUČOVÁNÍ\Škola matiky s Vojtou) a videí. Délka jen tam, kde je video.
  "p01": { date: "10. 9.",  title: "Taylorovy řady", min: null, topics: "Taylorovy řady a jejich zbytek" },
  "p02": { date: "17. 9.",  title: "Plošné a křivkové integrály", min: null, topics: "Dvojné integrály, Fubini a křivkové integrály" },
  "p03": { date: "23. 9.",  title: "Euler-Lagrangeova rovnice a multiplikátory", min: null, topics: "Navázání na variační počet z léta" },
  "p04": { date: "24. 9.",  title: "Potenciály a Greenova věta", min: null, topics: "Potenciály a Greenova věta" },
  "p05": { date: "1. 10.",  title: "Green a těžiště", min: 63, topics: "Greenova věta a středy České republiky" },
  "p06": { date: "12. 10.", title: "Komplexní čísla", min: 65, topics: "Gaussova rovina a počítání s komplexními čísly" },
  "p07": { date: "15. 10.", title: "Komplexní posloupnosti, řady a funkce", min: 68, topics: "Řady a funkce v komplexních číslech" },
};

// Sekce podle probraných témat, od nejnovějšího po nejstarší.
const SECTIONS = [
  { title: "Komplexní analýza", note: "teď běží", lessons: ["p07", "p06"] },
  { title: "Integrály v rovině", lessons: ["p05", "p04", "p02"] },
  { title: "Navázání na léto", lessons: ["p03", "p01"] },
  { title: "Variační počet", lessons: ["17", "16", "15", "14"] },
  { title: "Funkce více proměnných", lessons: ["13", "12"] },
  { title: "Diferenciální rovnice", lessons: ["11", "10"] },
  { title: "Integrály", lessons: ["09", "08"] },
  { title: "Derivace", lessons: ["07", "06", "05"] },
  { title: "Limity a nekonečné řady", lessons: ["04", "03"] },
  { title: "Jazyk matematiky", lessons: ["02", "01"] },
];

// Ukázky: zhruba každý druhý příspěvek shora. file = media/ukazky/<file>.mp4 a .jpg (náhled), len = délka.
// Kde je file null, ukázka se teprve vybírá. Náhradníci a časy: UKAZKY.md.
const PREVIEWS = {
  "p07": { file: "p07-sinus-rovna-dvema", title: "Kdy se sinus rovná dvěma", len: "0:56" },
  "p05": { file: "p05-sklad-s-drony", title: "Kam postavit sklad s drony", len: "1:05" },
  "17": { file: "17-retez-nevisi-do-paraboly", title: "Řetěz nevisí do paraboly", len: "1:16" },
  "15": { file: "15-optimalni-skluzavka", title: "Hledáme optimální skluzavku", len: "1:18" },
  "13": { file: "13-pul-faktorial", title: "Kolika způsoby seřadíš půl věci?", len: "0:58" },
  "11": { file: "11-parabola-z-odrazu", title: "Parabola z odrazu světla", len: "1:09" },
  "09": { file: "09-proc-integral-pocita-obsah", title: "Proč integrál počítá obsah", len: "1:17" },
  "07": { file: "07-lina-priroda", title: "Proč je příroda líná", len: "0:58" },
  "04": { file: "04-banka-cislo-e", title: "Banka, úroky a číslo e", len: "1:17" },
  "02": { file: "02-pi-z-lichych-cisel", title: "Pí z lichých čísel", len: "1:10" },
};
const CHIPS = ["logika", "indukce", "limity", "nekonečné řady", "derivace", "integrály", "diferenciální rovnice",
  "funkce více proměnných", "Feynmanův trik", "variační počet", "brachistochrona", "řetězovka"];
