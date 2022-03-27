<?php

namespace App\Controller;

use App\Entity\Hotel;
use App\Entity\Suite;
use App\Form\SuiteSpType;
use App\Form\SuiteType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Persistence\ManagerRegistry;


class SuiteFormController extends AbstractController
{
    #[Route('/admin/suiteform/{idHotel}', name: 'app_suite_form')]
    public function index(int $idHotel, Request $request, ManagerRegistry $doctrine): Response
    {
        $em = $doctrine->getManager();

        $hotel = $em->getRepository(Hotel::class)->find($idHotel);
        $suite = new Suite();
        $form = $this->createForm(SuiteType::class, $suite);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $url = ($_POST['picturesUrl']);
            $suite->setHotel($hotel);
            $suite->setHotelId($idHotel);
            $suite->setOccupied(false);
            $suite->setPicturesUrl([$url]);
            $em = $doctrine->getManager();
            $em->persist($suite);
            $em->flush();

        }
        return $this->render('suite_form/index.html.twig', [
            'form' => $form->createView(),
            $idHotel
        ]);
    }
    /**
     * @Route("sp/delete/suite/{id}" , name="suite_delete")
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

        return $this->redirect($this->generateUrl('app_home_page'));

    }

    /**
     * @Route("sp/editsuite/{id}", name="suite_edit")
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