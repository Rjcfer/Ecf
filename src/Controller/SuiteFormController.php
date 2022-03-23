<?php

namespace App\Controller;

use App\Entity\Hotel;
use App\Entity\Suite;
use App\Form\SuiteType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Persistence\ManagerRegistry;


class SuiteFormController extends AbstractController
{
    #[Route('/admin/suiteform/{idHotel}', name: 'app_suite_form')]
    public function index(int $idHotel ,Request $request, ManagerRegistry $doctrine): Response
    {
        $em = $doctrine->getManager();

        $hotel = $em->getRepository(Hotel::class)->find($idHotel);
        $suite = new Suite();
        $suite->setHotel($hotel);

        $form = $this->createForm(SuiteType::class, $suite);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {

            $em = $doctrine->getManager();
            $em->persist($suite);
            $em->flush();
        }
        return $this->render('suite_form/index.html.twig', [
            'form' => $form->createView(),
            $idHotel
        ]);
    }
}
