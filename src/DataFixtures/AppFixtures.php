<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Entity\Hotel;
use App\Entity\Suite;
use Faker;

class AppFixtures extends Fixture
{
    public function __construct(UserPasswordHasherInterface $userPasswordHasher)
    {
        $this->userPasswordHasher = $userPasswordHasher;
    }

    public function load(ObjectManager $manager)
    {
        $randomHotelimg = ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80',
            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            'https://d1vp8nomjxwyf1.cloudfront.net/wp-content/uploads/sites/156/2021/11/24161112/33-Big-17052021-DSC_3554-Modifier-www.gauvin.pictures-1804x1200.jpg',
            'https://www.kayak.fr/rimg/kimg/6f/df/3908b3bf-59bc3784.jpg?width=1366&height=768&crop=true',
        ];

        $picturesSuite = ['https://images2.bovpg.net/fw/media/1/2/1/8/5/218513.jpg',
            'https://hotelbarcelosevillaevents.com/wp-content/uploads/2015/12/suite-1.jpg',
            'https://images.unsplash.com/photo-1560067174-e553b3647603?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
            'https://images.unsplash.com/photo-1582582621959-48d27397dc69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
            'https://images.unsplash.com/photo-1581404554128-5032fe7874be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
            'https://images.unsplash.com/photo-1537823286324-7d070255022e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1606402181365-50126b74638d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
            'https://images.unsplash.com/photo-1581404635299-f473ede8699a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
            'https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1460&q=80',
            'https://media.istockphoto.com/photos/living-room-picture-id868684910?s=612x612',
            'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            'https://images.unsplash.com/photo-1559599242-651c4e085efb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
            'https://images.unsplash.com/photo-1559599242-651c4e085efb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
            'https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
            'https://images.unsplash.com/photo-1581404554128-5032fe7874be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
            'https://images.unsplash.com/photo-1565329921943-7e537b7a2ea9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
        ];
        $suitenames = ['Suite du maitre', 'Suite Paris', 'Suite champs-??lys??es', 'Suite champagne', 'Suite marne'];
        $titles = ['La belle', 'Le soleil levant', 'Douce nuit', 'Sunrise', 'The best night', 'Sun and Sand', 'Always Welcome',];
        $hotelNames = ['Regency Hotel', 'Hyatt', 'Hotel Jolly', '5 Star Getaway','Sun and Sand Hotel', 'Wordly Traveller Hotel', 'Cosmopolitan of Las Vegas'];
        $faker = Faker\Factory::create('fr_FR');
        // create 10 users fr

        for ($i = 0; $i < 10; $i++) {
            $user = new User();
            $user->setFirstName($faker->firstName);
            $user->setLastName($faker->lastName);
            $user->setRoles(["ROLE_CLIENT"]);
            $user->setMail($faker->email);
            $user->setPassword($this->userPasswordHasher->hashPassword($user, 'password'));
            $manager->persist($user);
            $manager->flush($user);
        }
        //add superadmin
        $userSP = new User();
        $userSP->setFirstName($faker->firstName);
        $userSP->setLastName($faker->lastName);
        $userSP->setRoles(["ROLE_SUPER_ADMIN"]);
        $userSP->setMail('superadmin@superadmin');
        $userSP->setPassword($this->userPasswordHasher->hashPassword($user, 'superadmin'));
        $manager->persist($userSP);
        $manager->flush($userSP);
        //creation of admin without hotel
        $userAdmin = new User();
        $userAdmin->setFirstName($faker->firstName);
        $userAdmin->setLastName($faker->lastName);
        $userAdmin->setRoles(["ROLE_ADMIN"]);
        $userAdmin->setMail('gerant@gerant');
        $userAdmin->setPassword($this->userPasswordHasher->hashPassword($user, 'gerant'));
        $manager->persist($userAdmin);
        $manager->flush($userAdmin);
        //creation of admin without hotel
        $client = new User();
        $client->setFirstName($faker->firstName);
        $client->setLastName($faker->lastName);
        $client->setRoles(["ROLE_CLIENT"]);
        $client->setMail('client@client');
        $client->setPassword($this->userPasswordHasher->hashPassword($user, 'gerant'));
        $manager->persist($client);
        $manager->flush($client);

        for ($i = 0; $i < 6; $i++) {
            $hotel = new Hotel();
            $hotel->setAddress($faker->address);
            $hotel->setCity($faker->city);
            $hotel->setDescription($faker->text);
            $hotel->setPictureUrl($randomHotelimg[$i]);
            $hotel->setName($hotelNames[$i]);
            $manager->persist($hotel);
            $manager->flush($hotel);
            for ($n = 0; $n < 4; $n++) {
                $suite = new Suite();
                $suite->setName($suitenames[rand(0, count($suitenames) - 1)]);
                $suite->setDescription($faker->text . ' ' . $faker->text);
                $suite->setHotel($hotel);
                $suite->setHotelId($hotel->getId());
                $suite->setBookingUrl('https://www.booking.com');
                $suite->setMainPictureUrl($picturesSuite[$n]);
                $suite->setPicturesUrl($this->getArrayOfPictures($picturesSuite));
                $suite->setTitle($titles[rand(0, count($titles) - 1)]);
                $suite->setPrice(rand(100, 500));
                $suite->setOccupied(false);
                $manager->persist($suite);
                $manager->flush($suite);
            }
        }

    }

    public function getArrayOfPictures($picturesSuite)
    {
        $a = [];
        for ($n = 0; $n < 4; $n++) {
            array_push($a, $picturesSuite[rand(1, count($picturesSuite) - 1)]);
        }
        return $a;
    }

}