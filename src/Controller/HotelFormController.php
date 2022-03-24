<?php

namespace App\Controller;

use App\Entity\Hotel;
use App\Entity\Suite;
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

    /**
     * @Route("sp/delete/hotel/{id}" , name="hotel_delete")
     */
    public function deleteAction(int $id, ManagerRegistry $doctrine)
    {

        $em = $doctrine->getManager();
        $hotel = $doctrine->getRepository(Hotel::class)->find($id);

        if (!$hotel) {
            throw $this->createNotFoundException(
                'Desole l\'hotel avec l\'id: ' . $id . ' n\'existe plus'
            );
        }
        $em->remove($hotel);
        $em->flush();

        return $this->render('home_page/index.html.twig', [
        ]);

    }

    /**
     * @Route("sp/edithotel/{id}", name="hotel_edit")
     */

    public function update(Request $request,ManagerRegistry $doctrine, int $id): Response
    {
        $em = $doctrine->getManager();
        $hotel = $em->getRepository(Hotel::class)->find($id);
        $form = $this->createForm(HotelType::class,$hotel);
        $form->handleRequest($request);

        if (!$hotel) {
            throw $this->createNotFoundException(
                'Le hotel avec l\'id: ' . $id . ' n\'existe plus  '
            );
        }
       // $url = ($_POST['picturesUrl']);
        $em->persist($hotel);
        $em->flush();

        return $this->render('hotel_form/index.html.twig', [
            'form' => $form->createView(),
        ]);


    }

}
