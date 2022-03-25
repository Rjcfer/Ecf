<?php

namespace App\Controller;

use App\Entity\Hotel;
use App\Entity\Suite;
use App\Form\HotelType;
use App\Form\SuiteSpType;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SuiteFormSPController extends AbstractController
{
    #[Route('/sp/suiteform', name: 'app_suite_form_s_p')]
    public function index(ManagerRegistry $doctrine, Request $request): Response
    {
        $em = $doctrine->getManager();
        $suite = new Suite();
        $form = $this->createForm(SuiteSpType::class,$suite);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $url = ($_POST['picturesUrl']);
            $idHotel = ($_POST['hotel_id']);
            $hotel = $em->getRepository(Hotel::class)->find($idHotel);
            $suite->setOccupied(false);
            $suite->setHotel($hotel);
            $suite->setPicturesUrl([$url]);
            $em = $doctrine->getManager();
            $em->persist($suite);
            $em->flush();

        }

        return $this->render('suite_form_sp/index.html.twig', [
            'form' => $form->createView(),
        ]);

    }
    /**
     * @Route("sp/delete/suite/{id}" , name="article_delete")
     */
    public function deleteAction(int $id, ManagerRegistry $doctrine) {

        $em = $doctrine->getManager();
        $suite = $doctrine->getRepository(Suite::class)->find($id);

        if (!$suite) {
            throw $this->createNotFoundException(
                'Desole la suite avec l\'id: ' . $id .' n\'existe plus'
            );
        }
        $em->remove($suite);
        $em->flush();

        return $this->render('home_page/index.html.twig', [
        ]);

    }

    /**
     * @Route("sp/editsuite/{id}", name="hotel_edit")
     */

    public function update(Request $request,ManagerRegistry $doctrine, int $id): Response
    {
        $em = $doctrine->getManager();
        $suite = $em->getRepository(Suite::class)->find($id);
        $form = $this->createForm(SuiteSpType::class,$suite);
        $form->handleRequest($request);

        if (!$suite) {
            throw $this->createNotFoundException(
                'Le suite avec l\'id: ' . $id . ' n\'existe plus  '
            );
        }
        // $url = ($_POST['picturesUrl']);
        $em->persist($suite);
        $em->flush();

        return $this->render('suite_form_sp/index.html.twig', [
            'form' => $form->createView(),
        ]);


    }
}
