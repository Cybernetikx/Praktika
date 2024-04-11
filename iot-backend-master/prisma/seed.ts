import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Anna',
    username: 'anna',
    password: 'anna',
    devices: {
      create: [
        {
          name: 'Устройство с датчиком температуры и влажности',
          comment:
            'Устройство которое может измерять температуру и влажность в помещении',
          latitude: 48.77846145629883,
          longitude: 44.46149444580078,
          sensors: {
            create: [
              {
                name: 'Датчик температуры',
                comment: 'Датчик температуры в спальной комнате',
              },
              {
                name: 'Датчик влажности',
                comment: 'Датчик влажности в спальной комнате',
              },
            ],
          },
        },
      ],
    },
  },
  {
    name: 'Maksim',
    username: 'maksim',
    password: 'maksim',
    devices: {
      create: [
        {
          name: 'Устройство с датчиком температуры',
          comment: 'Устройство, которое может измерять температуру в помещении',
          latitude: 56.9923,
          longitude: 40.9147,
          sensors: {
            create: [
              {
                name: 'Датчик температуры',
                comment: 'Датчик температуры в спальной комнате',
              },
            ],
          },
        },
        {
          name: 'Устройство с датчиком влажности',
          comment: 'Устройство, которое может измерять влажность в помещении',
          latitude: 56.8472,
          longitude: 35.951,
          sensors: {
            create: [
              {
                name: 'Датчик влажности',
                comment: 'Датчик влажности в спальной комнате',
              },
            ],
          },
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
