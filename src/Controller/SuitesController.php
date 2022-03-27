<?php

namespace App\Controller;

use App\Entity\Reservation;
use App\Entity\Suite;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;

class SuitesController extends AbstractController
{

    /**
     * @Route("suites/{idHotel}", name="show_suites")
     */
    public function index(int $idHotel, ManagerRegistry $doctrine): Response
    {

        $em = $doctrine->getManager();
        $suitesList = $em->getRepository(Suite::class)->findBy(['hotel_id' => $idHotel]);
        $reservationList = $em->getRepository(Reservation::class)->findAll();
//methode qui remet la suite a libre a la fin du delai de reservation
        foreach ($suitesList as $suite) {
            foreach ($reservationList as $reservation) {
                if (($reservation->getEndDate() > date("Y-m-d")) && $reservation->getSuite() == $suite) {
                    $suite->setOccupiedBy("");
                    $suite->setOccupied(false);
                    $em->persist($suite);
                    $em->persist($reservation);
                    $em->flush();

                }
            }
        }

        return $this->render('suites/index.html.twig', [
            'controller_name' => 'SuitesController',
            'suitesList' => $suitesList
        ]);
    }

}
