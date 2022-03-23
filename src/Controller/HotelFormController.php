<?php

namespace App\Controller;

use App\Entity\Hotel;
use App\Form\HotelType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;

class HotelFormController extends AbstractController
{
    #[Route('/sp/hotelform', name: 'app_hotel_form')]
    public function index(Request $request, ManagerRegistry $doctrine): Response
    {
        $hotel = new Hotel();
        $form = $this->createForm(HotelType::class, $hotel);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {

            $em = $doctrine->getManager();
            $em->persist($hotel);
            $em->flush();
        }

        return $this->render('hotel_form/index.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}
