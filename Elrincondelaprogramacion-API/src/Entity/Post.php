<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Post
 *
 * @ORM\Table(name="posts", 
 * indexes={
 *  @ORM\Index(name="fk_posts_categories", columns={"category_id"}),
 *  @ORM\Index(name="fk_posts_users", columns={"user_id"})
 * })
 * @ORM\Entity
 */
class Post
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
     * @var \Category
     *
     * @ORM\ManyToOne(targetEntity="Category")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="category_id", referencedColumnName="id")
     * })
     */
    private $category;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255, nullable=false)
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="content", type="text", length=0, nullable=false)
     */
    private $content;

    /**
     * @var bool
     *
     * @ORM\Column(name="inadequate", type="boolean", nullable=false)
     */
    private $inadequate;

    /**
     * @var string|null
     *
     * @ORM\Column(name="image", type="string", length=200, nullable=true)
     */
    private $image;

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
     * @var \User
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     * })
     */
    private $user;

    /**
     * @var \Comment
     *
     * @ORM\OneToMany(targetEntity="App\Entity\Comment", mappedBy="post")
     */
    private $comments;

    public function __construct($title, $content, $category, $inadequate, $image, $user, $createdAt) {
        $this->id=null;
        $this->title=$title;
        $this->content=$content;
        $this->category=$category;
        $this->inadequate=$inadequate;
        $this->image=$image;
        $this->user=$user;
        $this->createdAt=$createdAt;
        $this->comments = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCategory()
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;
        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;
        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;
        return $this;
    }

    public function getInadequate(): ?bool
    {
        return $this->inadequate;
    }

    public function setInadequate(?bool $inadequate): self
    {
        $this->inadequate = $inadequate;
        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): self
    {
        $this->image = $image;
        return $this;
    }

    public function getUser()
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;
        return $this;
    }

    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt=$updatedAt;
        return $this;
    }

    public function getComments()
    {
        return $this->comments;
    }

    public function setComments(?Comment $comments): self
    {
        $this->comments = $comments;
        return $this;
    }

    /**
     * Función que ejecuta una consulta
     * @param $em
     * @param $model
     * @param $action
     */
    public function execute($em, $model, $action)
    {       
        if ($action=='insert'||$action=='update') {
            //Guardamos o modificamos el modelo en el ORM
            $em->persist($model);
        } else if ($action=='delete') {
            $em->remove($model);
        }
        //Ejecutamos la sentencia en la base de datos
        $em->flush();
    }
}
