<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Comment
 *
 * @ORM\Table(name="comments", indexes={@ORM\Index(name="fk_comments_posts", columns={"post_id"}), 
 * @ORM\Index(name="fk_comments_users", columns={"user_id"})})
 * @ORM\Entity
 */
class Comment
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
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=false)
     */
    private $createdAt;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updated_at", type="datetime", nullable=false)
     */
    private $updatedAt;

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
     * @var \Post
     *
     * @ORM\ManyToOne(targetEntity="Post")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="post_id", referencedColumnName="id")
     * })
     */
    private $post;

    public function __construct($user, $post, $content, $inadequate) {
        $this->id = null;
        $this->user=$user;
        $this->post=$post;
        $this->content=$content;
        $this->inadequate=$inadequate;
        $this->createdAt=new \DateTime('now');
        $this->updatedAt=new \DateTime('now');
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function setInadequate(bool $inadequate): self
    {
        $this->inadequate = $inadequate;
        return $this;
    }

    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt=$updatedAt;
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

    public function getPost()
    {
        return $this->post;
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
