<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use App\Repository\ProprietaireRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ProprietaireRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['Proprietaire:read']],
    denormalizationContext: ['groups' => ['Proprietaire:write']],
)]
#[GetCollection]
#[Post]
#[Get]
#[Put]
class Proprietaire
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(groups: ['Proprietaire:read', 'Proprietaire:write'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[ApiFilter(SearchFilter::class, strategy: 'ipartial')]
    #[Groups(groups: ['Proprietaire:read', 'Proprietaire:write'])]
    private ?string $nomProprietaire = null;

    #[ORM\Column(length: 255)]
    #[Groups(groups: ['Proprietaire:read', 'Proprietaire:write'])]
    private ?string $prenomProprietaire = null;

    #[ORM\OneToMany(mappedBy: 'proprietaire', targetEntity: Animal::class)]
    #[Groups(groups: ['Proprietaire:read'])]
    private Collection $animals;

    public function __construct()
    {
        $this->animals = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNomProprietaire(): ?string
    {
        return $this->nomProprietaire;
    }

    public function setNomProprietaire(string $nomProprietaire): self
    {
        $this->nomProprietaire = $nomProprietaire;

        return $this;
    }

    public function getPrenomProprietaire(): ?string
    {
        return $this->prenomProprietaire;
    }

    public function setPrenomProprietaire(string $prenomProprietaire): self
    {
        $this->prenomProprietaire = $prenomProprietaire;

        return $this;
    }

    /**
     * @return Collection<int, Animal>
     */
    public function getAnimals(): Collection
    {
        return $this->animals;
    }

    public function addAnimal(Animal $animal): self
    {
        if (!$this->animals->contains($animal)) {
            $this->animals->add($animal);
            $animal->setProprietaire($this);
        }

        return $this;
    }

    public function removeAnimal(Animal $animal): self
    {
        if ($this->animals->removeElement($animal)) {
            // set the owning side to null (unless already changed)
            if ($animal->getProprietaire() === $this) {
                $animal->setProprietaire(null);
            }
        }

        return $this;
    }
}
