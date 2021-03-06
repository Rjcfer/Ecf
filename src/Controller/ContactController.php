<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Form\ContactType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mailer\MailerInterface;

class ContactController extends AbstractController
{
    #[Route('/contact', name: 'app_contact')]
    public function index(Request $request, MailerInterface $mailer)
    {
        $form = $this->createForm(ContactType::class);
        $form->handleRequest($request);


        if ($form->isSubmitted() && $form->isValid()) {

            $contactFormData = $form->getData();

            $message = (new Email())
                ->from('test.mail.rjcf@gmail.com') // sendgrid n'accepte que les mails des adresses verifiers
                ->to('test.mail.rjcf@gmail.com')
                ->subject($contactFormData['subject'])
                ->text('Expediteur : ' . $contactFormData['email'] . \PHP_EOL .
                    $contactFormData['msg'],
                    'text/plain');
            $mailer->send($message);
       //flash message to tell user that his message  has been send
            $this->addFlash('success', 'Votre message a été envoyé');
            return $this->redirectToRoute('app_home_page', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('contact/index.html.twig', [
            'form' => $form->createView()
        ]);
    }
}
