import prisma from "@/lib/prisma";

const villages = [
  "ANKLESHVAR",
  "BAHUCHARAJI",
  "BAJANA",
  "BELA",
  "BHANVAD",
  "BHARUCH",
  "CHANDAN NAGRI",
  "DANAVALA",
  "DEDANA",
  "DEVPURA",
  "DHARAMPUR",
  "DHINOJ (RELVEPURA)",
  "DHOLI",
  "DHRANGADHRA",
  "DHRUMATH",
  "DIKSAR",
  "DUDAPUR",
  "DUDHREJ",
  "GANDHIDHAM",
  "GHAGHRETIYA",
  "GITAPUR",
  "HALVAD",
  "HAMPAR",
  "HIRAPURA",
  "JADAVPURA",
  "JAMKHANDORNA",
  "JAMNAGAR",
  "JAYDEVPURA",
  "JESINGPURA",
  "KADI",
  "KALYANPURA",
  "KAREL",
  "KATUDA",
  "KHAKHRECHI",
  "KHANDERAVPURA",
  "KHARAGHODA",
  "KOYBA",
  "LAKHTAR",
  "LILAPUR",
  "MAHARAJPURA",
  "MANIPUR",
  "MEDHA",
  "MORBI",
  "MOTA ANKEVADIYA",
  "MOTA GORAIYA",
  "MOTA HIRAPURA",
  "MOTI MALVAN",
  "NANA GORAIYA",
  "NANI MAJETHI",
  "NAVSARI",
  "NICHI MANDAL",
  "PALAJ",
  "PALAJ (MOTI MADH)",
  "POCHADA",
  "RAJ CHARADI",
  "RAJKOT",
  "RAJPAR",
  "RAMGADH",
  "RANCHHODPURA",
  "RANMALPUR",
  "RANUJ",
  "RATANPAR",
  "ROHISHALA",
  "SADATPURA",
  "SARA",
  "SARPADAD",
  "SARVAL",
  "SEDLA",
  "SHIVPURA",
  "SOKALI",
  "SURAJPURA",
  "SURENDRANAGAR",
  "THALA",
  "THARAD",
  "VADHVAN",
  "VADODARA",
  "VISADPURA",
];

async function main() {
  console.log("🌱 Seeding villages...");

  for (const village of villages) {
    await prisma.village.upsert({
      where: {
        name: village.toLowerCase(),
      },
      update: {},
      create: {
        name: village.toLowerCase(),
      },
    });
  }

  console.log("✅ Villages seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
