<?php

namespace App\Controller;

use App\Entity\Hotel;
use App\Entity\Reservation;
use App\Entity\Suite;
use App\Form\ReservationType;
use App\Repository\ReservationRepository;
use ContainerLUt1Pge\getDoctrine_Orm_DefaultEntityManagerService;
use Doctrine\Persistence\ManagerRegistry;
use phpDocumentor\Reflection\Types\Boolean;
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
            $sId = ($_POST['suiteID']);
            // confirm if the user send's me a name for the reservation
            if (isset($_POST['reservationName'])) {
                $name = ($_POST['reservationName']);
            } else {
                $name = null;
            }
            $suite = $em->getRepository(Suite::class)->find($sId);
            $sDate = ($form->get('startDate')->getData())->getTimestamp();
            $eDate = ($form->get('endDate')->getData())->getTimestamp();
            $user = $this->getUser();
//confirm if user is connected and get his id
            if ($user != null) {
                $userId = $user->getId();
            } else {
                $userId = null;
            }

            if ($this->verifyIfIsAvailable($sDate, $eDate, $suite, $doctrine)) {
                $reservation->setReservationName($name);
                $reservation->setSuite($suite);
                $reservation->setUserId($userId);
                $reservationRepository->add($reservation);
                return $this->redirect($this->generateUrl('app_home_page'));
            }
            return $this->redirect($this->generateUrl('app_home_page'));
        }

        return $this->renderForm('reservation/new.html.twig', [
            'reservation' => $reservation,
            'form' => $form,
            'hotelList' => $hotelList,
            'suiteList' => $suiteList
        ]);
    }

// method allows me to show id a suite is available or not
    public function verifyIfIsAvailable($sDate, $eDate, $suite, ManagerRegistry $doctrine)
    {
        $em = $doctrine->getManager();
        $reservationsList = $em->getRepository(Reservation::class)->findAll();
        //confirmation if is array and if given dates are availables
        if (is_array($reservationsList)) {
            foreach ($reservationsList as $r) {
                if ($r->getSuite() == $suite) {
                    $start = $r->getStartDate()->getTimestamp();
                    $end = $r->getEndDate()->getTimestamp();

                    if ($start >= $sDate && $start <= $eDate) {
                        return false;
                    }
                    if ($start <= $sDate && $sDate <= $end) {
                        return false;
                    }
                    if ($eDate >= $end && $sDate <= $start) {
                        return false;
                    }
                    if ($end >= $sDate && $end <= $eDate) {
                        return false;
                    }
                }
            }
            return true;
        } else {
            return false;
        }

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
            $sDate = ($form->get('startDate')->getData())->getTimestamp();
            $eDate = ($form->get('endDate')->getData())->getTimestamp();
            if ($this->verifyIfIsAvailable($sDate, $eDate, $suite, $doctrine)) {
                $em->persist($reservation);
                $em->flush();
                $this->addFlash('success', 'Reservation terminé');
                $em->persist($reservation);
                $em->flush();
                return $this->redirect($this->generateUrl('app_home_page'));
            }
            return $this->redirect($this->generateUrl('app_home_page'));
        }

        return $this->renderForm('reservation/new.html.twig', [
            'suiteList' => $suiteList,
            'hotelList' => $hotelList,
            'reservation' => $reservation,
            'form' => $form,
        ]);
    }

    #[Route('/newwithoutuserId/{idHotel}/{idSuite}', name: 'app_reservation_newwithoutuserId', methods: ['GET', 'POST'])]
    public function newWithoutUserId(int $idHotel, int $idSuite, Request $request, ManagerRegistry $doctrine): Response
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
            $sDate = ($form->get('startDate')->getData())->getTimestamp();
            $eDate = ($form->get('endDate')->getData())->getTimestamp();
            if ($this->verifyIfIsAvailable($sDate, $eDate, $suite, $doctrine)) {
                $em->persist($reservation);
                $em->flush();
                $this->addFlash('success', 'Reservation terminé');
                return $this->redirect($this->generateUrl('app_home_page'));
            }
            return $this->redirect($this->generateUrl('app_home_page'));
        }

        return $this->renderForm('reservation/new.html.twig', [
            'hotelList' => $hotelList,
            'suiteList' => $suiteList,
            'reservation' => $reservation,
            'form' => $form,
        ]);
    }

//use to ajax requests

    #[Route('/{id}', name: 'app_reservation_show', methods: ['GET'])]
    public function show(Reservation $reservation): Response
    {
        $suiteName = $reservation->getSuite()->getName();
        $hotel = $reservation->getSuite()->getHotel();
        return $this->render('reservation/show.html.twig', [
            'reservation' => $reservation,
            'suiteName' => $suiteName,
            'hotel' => $hotel
        ]);
    }

    #[Route('/{id}/edit', name: 'app_reservation_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Reservation $reservation, ReservationRepository $reservationRepository): Response
    {
        $form = $this->createForm(ReservationType::class, $reservation);
        $form->handleRequest($request);
        $hotel = $reservation->getSuite()->getHotel();
        $suite = $reservation->getSuite();
        if ($form->isSubmitted() && $form->isValid()) {
            $reservationRepository->add($reservation);
            return $this->redirectToRoute('app_reservation_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('reservation/edit.html.twig', [
            'reservation' => $reservation,
            'form' => $form,
            'hotel' => $hotel,
            'suite' => $suite
        ]);
    }

    #[Route('/{id}', name: 'app_reservation_delete', methods: ['POST'])]
    public function delete(Request $request, Reservation $reservation, ReservationRepository $reservationRepository): Response
    {
        $canDel = false;
        $sDate = $reservation->getStartDate()->getTimestamp();
        $dateOfTheDay = strtotime('now');
        $limitDate = strtotime('-3 days', $sDate);
        if ($dateOfTheDay < $limitDate) {
            $canDel = true;
        }

        // never trust user inputs so i try the dates again
        if ($this->isCsrfTokenValid('delete' . $reservation->getId(), $request->request->get('_token')) && $canDel) {
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
            $arrayToSend[] = ['name' => $suite->getname(), 'id' => $suite->getId(), 'price' => $suite->getPrice()];
        }
        return $this->json(['code' => 200, 'suites' => $arrayToSend], 200);
    }

    #[Route('/getdispo/{suiteId}', name: 'app_reservation_getReservationsList', methods: ['POST', 'GET'])]
    public function reservationsDates(int $suiteId, ManagerRegistry $doctrine, Request $request): Response
    {

        $data = $request->getContent();
        $data = json_decode($data, true);
        $eDate = strtotime($data["endDate"]);
        $sDate = strtotime($data["startDate"]);
        //get reservations by suite id to send like a json and use ajax in front
        $em = $doctrine->getManager();
        $suite = $em->getRepository(Suite::class)->find($suiteId);
        $reservationsList = $em->getRepository(Reservation::class)->findAll();
        $isAvailable = $this->verifyIfIsAvailable($sDate, $eDate, $suite, $doctrine);

        return $this->json(['code' => 200, 'isAvailable' => $isAvailable], 200);
    }

    #[Route('/candelete/{reservationId}', name: 'app_reservation_canDelete', methods: ['POST', 'GET'])]
    public function canDelete(int $reservationId, ManagerRegistry $doctrine): Response
    {
        $canDel = false;
        $em = $doctrine->getManager();
        $reservation = $em->getRepository(Reservation::class)->find($reservationId);
        $sDate = $reservation->getStartDate()->getTimestamp();
        $dateOfTheDay = strtotime('now');
        $limitDate = strtotime('-3 days', $sDate);
        if ($dateOfTheDay < $limitDate) {
            $canDel = true;
        }

        return $this->json(['code' => 200, 'canDelete' => $canDel, 'dateOfTheDay' => $dateOfTheDay, '$limitDate' => $limitDate], 200);
    }
}