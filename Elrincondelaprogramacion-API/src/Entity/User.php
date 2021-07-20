<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use JsonSerializable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

/**
 * User
 *
 * @ORM\Table(name="users", uniqueConstraints={@ORM\UniqueConstraint(name="nick", columns={"nick"}), 
 * @ORM\UniqueConstraint(name="email", columns={"email"})})
 * @ORM\Entity
 */
class User implements UserInterface, PasswordAuthenticatedUserInterface, JsonSerializable
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
     * @ORM\Column(name="nick", type="string", length=50, nullable=false)
     */
    private $nick;

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=50, nullable=false)
     */
    private $email;

    /**
     * @var string
     *
     * @ORM\Column(name="password", type="string", length=255, nullable=false)
     */
    private $password;

    /**
     * @var string|null
     *
     * @ORM\Column(name="profile_image", type="string", length=200, nullable=true)
     */
    private $profileImage;

    /**
     * @var array
     *
     * @ORM\Column(name="roles", type="json", nullable=false)
     */
    private $roles=[];

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
     * Para obtener todos los posts de un usuario hacemos una relación, donde "targetEntity"
     * apunta al modelo y "mappedBy" está mapeada por el modelo usuario
     * @ORM\OneToMany(targetEntity="App\Entity\Post", mappedBy="user")
     */
    private $posts;

    /**
     * @var
     * @ORM\OneToMany(targetEntity="App\Entity\Comment", mappedBy="user")
     */
    private $comments;

    public function __construct($nick, $email, $password, $profileImage, $role, $createdAt, $updatedAt) {
        $this->id=null;
        $this->nick=$nick;
        $this->email=$email;
        $this->password=$password;
        $this->profileImage=$profileImage;
        $this->roles=$role;
        $this->createdAt=$createdAt;
        $this->updatedAt=$updatedAt;
        $this->posts = new ArrayCollection();
        $this->comments = new ArrayCollection();
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @deprecated since Symfony 5.3, use getUserIdentifier instead
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';
        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;
        return $this;
    }

     /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;
        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNick(): ?string
    {
        return $this->nick;
    }

    public function setNick(string $nick): self
    {
        $this->nick = $nick;
        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }

    public function getProfileImage(): ?string
    {
        return $this->profileImage;
    }

    public function setProfileImage(?string $profileImage): self
    {
        $this->profileImage = $profileImage;
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

    /**
     * Función que obtiene todos los posts
     * @return Collection|Post[]
     */
    public function getPosts()
    {
        return $this->posts;
    }

    /**
     * Función que obtiene todos los comentarios
     * @return Collection|Comment[]
     */
    public function getComments()
    {
        return $this->comments;
    }

    /**
     * Función que sobreescribe una función de la interfaz "jsonSerializable" en la cual le indicamos
     * las propiedades que queremos serializar (la contraseña obviamente no para no mostrarla) 
     * @return array
     */
    public function jsonSerialize()
    {
        return [
            'id'=>$this->id,
            'nick'=>$this->nick,
            'email'=>$this->email,
            'profileImage'=>$this->profileImage,
            'roles'=>$this->roles,
            'createdAt'=>$this->createdAt,
            'updatedAt'=>$this->updatedAt
        ];
    }

    /**
     * Función que ejecuta una consulta
     * @param $em
     * @param $user
     * @param $action
     */
    public function execute($em, User $user, $action)
    {       
        if ($action=='insert'||$action=='update') {
            //Guardamos o modificamos el usuario en el ORM
            $em->persist($user);
        } else if ($action=='delete') {
            $em->remove($user);
        }
        //Ejecutamos la sentencia en la base de datos
        $em->flush();
    }
}
