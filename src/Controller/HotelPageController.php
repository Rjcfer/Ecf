<?php

namespace App\Controller;

use App\Entity\Hotel;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;

class HotelPageController extends AbstractController
{
    #[Route('/hotel/{id}', name: 'app_hotel_page')]
    public function index(ManagerRegistry $doctrine, int $id): Response
    {
        $em = $doctrine->getManager();
        $hotel = $em->getRepository(Hotel::class)->find($id);
        return $this->render('hotel_page/index.html.twig', [
            'hotel' => $hotel,
            'controller_name' => 'HotelPageController',
        ]);
    }
}
