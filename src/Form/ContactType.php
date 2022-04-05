<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ContactType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('lastName', TextType::class, [
                'label' => 'Nom',
            ])
            ->add('firstName', TextType::class, [
                'label' => 'Prénom',
            ])
            ->add('email', EmailType::class, [
                'label' => 'Email',
            ])
            ->add('msg', TextareaType::class, [
                'label' => 'Message',
                'attr' => ['rows' => 6],
            ])
            ->add('subject', ChoiceType::class, [
                'label' => 'Motif',
                'choices' => [
                    'Je souhaite poser une réclamation' => 'Je souhaite poser une réclamation',
                    'Je souhaite commander un service supplémentaire' => 'Je souhaite commander un service supplémentaire',
                    'Je souhaite en savoir plus sur une suite' => 'Je souhaite en savoir plus sur une suite',
                    'J’ai un souci avec cette application' => 'J’ai un souci avec cette application',
                ]
            ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
        ]);
    }
}