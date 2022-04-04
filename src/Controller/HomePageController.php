<?php

namespace App\Controller;

use App\Entity\Hotel;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class HomePageController extends AbstractController
{

    #[Route('/', name: 'app_home_page')]
    public function index(ManagerRegistry $doctrine): Response
    {
        // Entity manager
        $em = $doctrine->getManager();
        // all hotels on database
        $hotelList = $em->getRepository(Hotel::class)->findAll();

        return $this->render('home_page/index.html.twig', [
            'hotelList' => $hotelList
        ]);
    }
}
