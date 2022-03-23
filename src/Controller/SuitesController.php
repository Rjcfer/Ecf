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
     * @Route("/admin/suites/{idHotel}", name="update_Suite")
     */
   public function index(int $idHotel):Response
    {  
       echo($idHotel);
        return $this->render('index/form.html.twig', [
        'controller_name' => 'SuitesController', 
        ]);
    }
    public function reservation(int $idHotel,int $idSuite,ManagerRegistry $doctrine, Request $request)
    {
        $em = $doctrine->getManager();
        $suite = $em->getRepository(Suite::class)->findBy(['id'=>$idSuite]);

        $form = $this->createForm(ReservationType::class,$suite);
        $form->handleRequest($request);
        if($form->isSubmitted()&& $form->isValid()){
            $this->reserveSuite($suite,$doctrine);
            return $this-> redirectToRoute('/');
        }else{
            $params = array(
                'form' => $form,
                'suite' => $suite
            );
            return $this->render('suites/index.html.twig',$params);
        }
    }

   private function reserveSuite($suite, $doctrine){
       $suite->setOccupied(true);
     //  $suite->setOccupiedBy($user);
     $em = $doctrine->getManager();
     $em->persist($suite);
     $em->flush();
    }
}
