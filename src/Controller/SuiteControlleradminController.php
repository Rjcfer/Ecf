<?php

namespace App\Controller;

use App\Entity\Hotel;
use App\Entity\Suite;
use App\Form\SuiteType;
use App\Repository\SuiteRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/suite/controlleradmin')]
class SuiteControlleradminController extends AbstractController

{
    #[Route('/{idHotel}', name: 'app_suite_controlleradmin_index', methods: ['GET'])]
    public function index(int $idHotel ,SuiteRepository $suiteRepository): Response
    {
        return $this->render('suite_controlleradmin/index.html.twig', [
            'suites' => $suiteRepository->findAll(),
        ]);
    }

    #[Route('/new/{idHotel}', name: 'app_suite_controlleradmin_new', methods: ['GET', 'POST'])]
    public function new(ManagerRegistry $doctrine ,int $idHotel ,Request $request, SuiteRepository $suiteRepository): Response
    {
        $em = $doctrine->getManager();
        $suite = new Suite();
        $form = $this->createForm(SuiteType::class, $suite);
        $form->handleRequest($request);
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
            return $this->redirectToRoute('app_suite_controlleradmin_index', array('idHotel'=>$idHotel), Response::HTTP_SEE_OTHER);

        }
        return $this->renderForm('suite_controlleradmin/new.html.twig', [
            'suite' => $suite,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_suite_controlleradmin_show', methods: ['GET'])]
    public function show(Suite $suite): Response
    {
        return $this->render('suite_controlleradmin/show.html.twig', [
            'suite' => $suite,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_suite_controlleradmin_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Suite $suite, SuiteRepository $suiteRepository): Response
    {
        $form = $this->createForm(SuiteType::class, $suite);
        $form->handleRequest($request);
        $idHotel = $suite->getHotelId();

        if ($form->isSubmitted() && $form->isValid()) {
            $suiteRepository->add($suite);
            return $this->redirectToRoute('app_suite_controlleradmin_index', array('idHotel'=>$idHotel), Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('suite_controlleradmin/edit.html.twig', [
            'suite' => $suite,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_suite_controlleradmin_delete', methods: ['POST'])]
    public function delete(Request $request, Suite $suite, SuiteRepository $suiteRepository): Response
    {
        if ($this->isCsrfTokenValid('delete' . $suite->getId(), $request->request->get('_token'))) {
            $suiteRepository->remove($suite);
        }
        $idHotel = $suite->getHotelId();
        return $this->redirectToRoute('app_suite_controlleradmin_index', array('idHotel'=>$idHotel), Response::HTTP_SEE_OTHER);
    }
}
