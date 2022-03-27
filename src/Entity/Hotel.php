<?php

namespace App\Entity;

use App\Repository\HotelRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: HotelRepository::class)]
class Hotel
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $address;

    #[ORM\Column(type: 'string', length: 50)]
    private $name;

    #[ORM\OneToMany(mappedBy: 'hotel', targetEntity: Suite::class)]
    private $suitesList;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $pictureUrl;

    #[ORM\Column(type: 'string', length: 100)]
    private $City;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $Description;

    #[ORM\OneToMany(mappedBy: 'hotel', targetEntity: User::class)]
    private $manager;

    #[ORM\OneToMany(mappedBy: 'Hotel', targetEntity: Reservation::class, orphanRemoval: true)]
    private $reservations;

    public function __construct()
    {
        $this->suitesList = new ArrayCollection();
        $this->manager = new ArrayCollection();
        $this->reservations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
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
    public function getPictureUrl(): ?string
    {
        return $this->pictureUrl;
    }

    public function setPictureUrl(?string $pictureUrl): self
    {
        $this->pictureUrl = $pictureUrl;

        return $this;
    }


    /**
     * @return Collection<int, Suite>
     */
    public function getSuitesList(): Collection
    {
        return $this->suitesList;
    }

    public function addSuitesList(Suite $suitesList): self
    {
        if (!$this->suitesList->contains($suitesList)) {
            $this->suitesList[] = $suitesList;
            $suitesList->setHotel($this);
        }

        return $this;
    }

    public function removeSuitesList(Suite $suitesList): self
    {
        if ($this->suitesList->removeElement($suitesList)) {
            // set the owning side to null (unless already changed)
            if ($suitesList->getHotel() === $this) {
                $suitesList->setHotel(null);
            }
        }

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->City;
    }

    public function setCity(string $City): self
    {
        $this->City = $City;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->Description;
    }

    public function setDescription(?string $Description): self
    {
        $this->Description = $Description;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getManager(): Collection
    {
        return $this->manager;
    }

    public function addManager(User $manager): self
    {
        if (!$this->manager->contains($manager)) {
            $this->manager[] = $manager;
            $manager->setHotel($this);
        }

        return $this;
    }

    public function removeManager(User $manager): self
    {
        if ($this->manager->removeElement($manager)) {
            // set the owning side to null (unless already changed)
            if ($manager->getHotel() === $this) {
                $manager->setHotel(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Reservation>
     */
    public function getReservations(): Collection
    {
        return $this->reservations;
    }

    public function addReservation(Reservation $reservation): self
    {
        if (!$this->reservations->contains($reservation)) {
            $this->reservations[] = $reservation;
            $reservation->setHotel($this);
        }

        return $this;
    }

    public function removeReservation(Reservation $reservation): self
    {
        if ($this->reservations->removeElement($reservation)) {
            // set the owning side to null (unless already changed)
            if ($reservation->getHotel() === $this) {
                $reservation->setHotel(null);
            }
        }

        return $this;
    }


}
