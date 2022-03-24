<?php

namespace App\Controller;

use App\Entity\Suite;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\BrowserKit\Request;

class SuitesController extends AbstractController
{

    /**
     * @Route("client/suites/{idHotel}", name="show_suites")
     */
   public function index(int $idHotel, ManagerRegistry $doctrine):Response
    {
        $em= $doctrine->getManager();
       $suitesList = $em->getRepository(Suite::class)->findBy(['hotel_id' => $idHotel]);
       echo($idHotel);
        return $this->render('suites/index.html.twig', [
        'controller_name' => 'SuitesController',
            'suitesList'=>$suitesList
        ]);
    }

}
