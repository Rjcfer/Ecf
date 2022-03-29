<?php

namespace App\Controller;

use App\Entity\Hotel;
use App\Entity\Reservation;
use App\Entity\Suite;
use App\Form\ReservationType;
use App\Repository\ReservationRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/reservation')]
class ReservationController extends AbstractController
{
    #[Route('/', name: 'app_reservation_index', methods: ['GET'])]
    public function index(ReservationRepository $reservationRepository): Response
    {
        return $this->render('reservation/index.html.twig', [
            'reservations' => $reservationRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_reservation_new', methods: ['GET', 'POST'])]
    public function new(Request $request, ReservationRepository $reservationRepository, ManagerRegistry $doctrine): Response
    {
        $reservation = new Reservation();
        $em = $doctrine->getManager();
        $form = $this->createForm(ReservationType::class, $reservation);
        $form->handleRequest($request);
        $hotelList = $em->getRepository(Hotel::class)->findAll();
        $suiteList = $em->getRepository(Suite::class)->findAll();

        if ($form->isSubmitted() && $form->isValid()) {
            $sId = ($_POST['sID']);
            $hId = ($_POST['hID']);
            $suite = $em->getRepository(Suite::class)->find($sId);
            $hotel = $em->getRepository(Hotel::class)->find($hId);
            $reservation->setSuite($suite);

            $reservationRepository->add($reservation);
            return $this->redirectToRoute('app_reservation_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('reservation/new.html.twig', [
            'reservation' => $reservation,
            'form' => $form,
            'hotelList' => $hotelList,
            'suiteList'=>$suiteList

        ]);
    }

    #[Route('/newwithids/{idHotel}/{idSuite}/{idUser}', name: 'app_reservation_newwithids', methods: ['GET', 'POST'])]
    public function newWithIds(int $idHotel, int $idSuite, int $idUser, Request $request, ReservationRepository $reservationRepository, ManagerRegistry $doctrine): Response
    {
        $em = $doctrine->getManager();
        $hotelList = [$em->getRepository(Hotel::class)->find($idHotel)];
        $suiteList = [$em->getRepository(Suite::class)->find($idSuite)];
        $suite = $em->getRepository(Suite::class)->find($idSuite);
        $reservation = new Reservation();
        $suite->setOccupiedBy($idUser);
        $suite->setOccupied(true);
        $reservation->setSuite($suite);
        $reservation->setUserId($idUser);
        $form = $this->createForm(ReservationType::class, $reservation);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em->persist($reservation);
            $em->flush();
            return $this->redirect($this->generateUrl('app_home_page'));
        }

        return $this->renderForm('reservation/new.html.twig', [
            'suiteList'=>$suiteList,
            'hotelList' => $hotelList,
            'reservation' => $reservation,
            'form' => $form,
        ]);
    }

    #[Route('/newwithoutuserId/{idHotel}/{idSuite}', name: 'app_reservation_newwithoutuserId', methods: ['GET', 'POST'])]
    public function newWithoutUserId(int $idHotel, int $idSuite, Request $request, ReservationRepository $reservationRepository, ManagerRegistry $doctrine): Response
    {
        $em = $doctrine->getManager();
        $suiteList = [$em->getRepository(Suite::class)->find($idSuite)];
        $suite = $em->getRepository(Suite::class)->find($idSuite);
        $hotelList = [$em->getRepository(Hotel::class)->find($idHotel)];
        $reservation = new Reservation();
        $suite->setOccupied(true);
        $reservation->setSuite($suite);
        $form = $this->createForm(ReservationType::class, $reservation);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em->persist($reservation);
            $em->flush();
            return $this->redirect($this->generateUrl('app_home_page'));
        }

        return $this->renderForm('reservation/new.html.twig', [
            'hotelList' => $hotelList,
            'suiteList'=>$suiteList,
            'reservation' => $reservation,
            'form' => $form,
        ]);
    }


    #[Route('/{id}', name: 'app_reservation_show', methods: ['GET'])]
    public function show(Reservation $reservation, Suite $suite): Response
    {
        return $this->render('reservation/show.html.twig', [
            'reservation' => $reservation,
            'suiteName' => $suite->getName(),
        ]);
    }

    #[Route('/{id}/edit', name: 'app_reservation_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Reservation $reservation, ReservationRepository $reservationRepository): Response
    {
        $form = $this->createForm(ReservationType::class, $reservation);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $reservationRepository->add($reservation);
            return $this->redirectToRoute('app_reservation_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('reservation/edit.html.twig', [
            'reservation' => $reservation,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_reservation_delete', methods: ['POST'])]
    public function delete(Request $request, Reservation $reservation, ReservationRepository $reservationRepository): Response
    {
        if ($this->isCsrfTokenValid('delete' . $reservation->getId(), $request->request->get('_token'))) {
            $reservationRepository->remove($reservation);
        }

        return $this->redirectToRoute('app_reservation_index', [], Response::HTTP_SEE_OTHER);
    }

    #[Route('/getsuite/{hotelId}', name: 'app_reservation_getsuiteList', methods: ['POST', 'GET'])]
    public function findOcuupiedOrNot(int $hotelId, ManagerRegistry $doctrine): Response
    {
        $em = $doctrine->getManager();
        $suiteList = $em->getRepository(Suite::class)->findBy(['hotel_id' => $hotelId]);
        $arrayToSend = [];
        foreach ($suiteList as $suite) {
            $arrayToSend = ['name' => $suite->getname(), 'id' => $suite->getId()];
        }
        return $this->json(['code' => 200, 'message' => 'ok','suites'=>$arrayToSend], 200);
    }
}
