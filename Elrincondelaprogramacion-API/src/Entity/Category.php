<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Categories
 *
 * @ORM\Table(name="categories", indexes={@ORM\Index(name="fk_categories_users", columns={"user_id"})}, 
 * uniqueConstraints={@ORM\UniqueConstraint(name="name", columns={"name"})})
 * @ORM\Entity
 */
class Category
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var \User
     *
     * @ORM\ManyToOne(targetEntity="User", inversedBy="categories")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     * })
     */
    private $user;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255, nullable=false)
     */
    private $name;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=false)
     */
    private $createdAt='current_timestamp()';

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updated_at", type="datetime", nullable=false)
     */
    private $updatedAt='current_timestamp()';

    /**
     * @var \Post
     *
     * @ORM\OneToMany(targetEntity="App\Entity\Post", mappedBy="categoryId")
     */
    private $posts;

    public function __construct($userId, $name) {
        $this->id=null;
        $this->user=$userId;
        $this->name=$name;
        $this->createdAt=new \DateTime('now');
        $this->updatedAt=new \DateTime('now');
        $this->posts = new ArrayCollection();
    }

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

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;
        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;
        return $this;
    }

    public function getPosts()
    {
        return $this->posts;
    }

    public function setPosts(?Post $posts)
    {
        $this->posts=$posts;
        return $this;
    }

    public function getUser()
    {
        return $this->user;
    }

    public function setUser(?User $user)
    {
        $this->user=$user;
        return $this;
    }

    /**
     * Función que ejecuta una consulta
     * @param $em
     * @param $category
     * @param $action
     */
    public function execute($em, Category $category, $action)
    {       
        if ($action=='insert'||$action=='update') {
            //Guardamos o modificamos el usuario en el ORM
            $em->persist($category);
        } else if ($action=='delete') {
            $em->remove($category);
        }
        //Ejecutamos la sentencia en la base de datos
        $em->flush();
    }
}
