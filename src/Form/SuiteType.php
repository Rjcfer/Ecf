<?php

namespace App\Form;

use App\Entity\Hotel;
use App\Entity\Suite;
use Doctrine\DBAL\Types\ArrayType;
use Doctrine\DBAL\Types\JsonType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SuiteType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name')
            ->add('description', TextType::class)
            ->add('price')
            ->add('Title')
            ->add('bookingUrl')
            ->add('mainPictureUrl');
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Suite::class,
        ]);
    }
}