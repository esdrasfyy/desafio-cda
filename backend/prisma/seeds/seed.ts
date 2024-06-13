import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  try {
    await prisma.emblem.createMany({
      data: [
        {
          slug: 'cda',
          name: 'Cidade Alta',
          image: 'https://cidadealtarp.com/imagens/challenge/cidade-alta.png',
        },
        {
          slug: 'cda-valley',
          name: 'Cidade Alta Valley',
          image:
            'https://cidadealtarp.com/imagens/challenge/cidade-alta-valley.png',
        },
        {
          slug: 'policia',
          name: 'Policia do Cidade Alta',
          image: 'https://cidadealtarp.com/imagens/challenge/policia.png',
        },
        {
          slug: 'hospital',
          name: 'Hospital do Cidade Alta',
          image: 'https://cidadealtarp.com/imagens/challenge/hospital.png',
        },
        {
          slug: 'mecanica',
          name: 'Mecânica do Cidade Alta',
          image: 'https://cidadealtarp.com/imagens/challenge/mecanica.png',
        },
        {
          slug: 'taxi',
          name: 'Taxi do Cidade Alta',
          image: 'https://cidadealtarp.com/imagens/challenge/taxi.png',
        },
        {
          slug: 'curuja',
          name: 'Coruja',
          image: 'https://cidadealtarp.com/imagens/challenge/coruja.png',
        },
        {
          slug: 'hiena',
          name: 'Hiena',
          image: 'https://cidadealtarp.com/imagens/challenge/hiena.png',
        },
        {
          slug: 'gato',
          name: 'Gato',
          image: 'https://cidadealtarp.com/imagens/challenge/gato.png',
        },
        {
          slug: 'urso',
          name: 'Urso',
          image: 'https://cidadealtarp.com/imagens/challenge/urso.png',
        },
      ],
    });
    console.log('Successfully executed seed');
  } catch (error) {
    console.error('Error when executing the seed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
