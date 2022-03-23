<?php

namespace App\Entity;

use App\Repository\SuiteRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SuiteRepository::class)]
class Suite
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 50)]
    private $name;

    #[ORM\Column(type: 'boolean')]
    private $occupied;

    #[ORM\ManyToOne(targetEntity: hotel::class, inversedBy: 'suitesList')]
    #[ORM\JoinColumn(nullable: false)]
    private $hotel;

    #[ORM\Column(type: 'string', length: 100, nullable: true)]
    private $occupiedBy;

    #[ORM\Column(type: 'float')]
    private $price;


    #[ORM\Column(type: 'json')]
    private $picturesUrl = [];

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $Title;

    #[ORM\Column(type: 'string', length: 255)]
    private $bookingUrl;

    #[ORM\Column(type: 'string', length: 255)]
    private $description;

    #[ORM\OneToOne(mappedBy: 'suite', targetEntity: Reservation::class, cascade: ['persist', 'remove'])]
    private $reservation;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getOccupied(): ?bool
    {
        return $this->occupied;
    }

    public function setOccupied(bool $occupied): self
    {
        $this->occupied = $occupied;

        return $this;
    }

    public function getHotel(): ?hotel
    {
        return $this->hotel;
    }

    public function setHotel(?hotel $hotel): self
    {
        $this->hotel = $hotel;

        return $this;
    }

    public function getOccupiedBy(): ?string
    {
        return $this->occupiedBy;
    }

    public function setOccupiedBy(?string $occupiedBy): self
    {
        $this->occupiedBy = $occupiedBy;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getPicturesUrl(): ?array
    {
        return $this->picturesUrl;
    }

    public function setPicturesUrl(?array $picturesUrl): self
    {
        $this->picturesUrl = $picturesUrl;

        return $this;
    }


    public function getTitle(): ?string
    {
        return $this->Title;
    }

    public function setTitle(?string $Title): self
    {
        $this->Title = $Title;

        return $this;
    }

    public function getBookingUrl(): ?string
    {
        return $this->bookingUrl;
    }

    public function setBookingUrl(string $bookingUrl): self
    {
        $this->bookingUrl = $bookingUrl;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getReservation(): ?Reservation
    {
        return $this->reservation;
    }

    public function setReservation(?Reservation $reservation): self
    {
        // unset the owning side of the relation if necessary
        if ($reservation === null && $this->$reservation !== null) {
            $this->reservation->setSuite(null);
        }

        // set the owning side of the relation if necessary
        if ($reservation !== null && $reservation->getSuite() !== $this) {
            $reservation->setSuite($this);
        }

        $this->reservation = $reservation;

        return $this;
    }
}
