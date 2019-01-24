<?php

namespace Drupal;

use Drupal\DrupalExtension\Context\RawDrupalContext;
use Behat\Behat\Context\SnippetAcceptingContext;

/**
 * FeatureContext class defines custom step definitions for Behat.
 */
class FeatureContext extends RawDrupalContext implements SnippetAcceptingContext {

    /**
     * Initializes context.
     *
     * Every scenario gets its own context instance.
     * You can also pass arbitrary arguments to the
     * context constructor through behat.yml.
     */

    /**
     * public member that defines the login path
     */
    public $path = '/user';

    /**
     * Creates and authenticates a user with the given role(s).
     *
     * @Given I am logged into the distro with the :role role(s)
     */
    public function assertAuthenticatedByRole($role) {
        // Check if a user with this role is already logged in.
        if (!$this->loggedInWithRole($role)) {
            // Create user (and project)
            $user = (object) array(
                'name' => $this->getRandom()->name(8),
                'pass' => $this->getRandom()->name(16),
                'role' => $role,
            );
            $user->mail = "{$user->name}@example.com";

            $this->userCreate($user);

            $roles = explode(',', $role);
            $roles = array_map('trim', $roles);
            foreach ($roles as $role) {
                if (!in_array(strtolower($role), array('authenticated', 'authenticated user'))) {
                    // Only add roles other than 'authenticated user'.
                    $this->getDriver()->userAddRole($user, $role);
                }
            }

            // Login via the alternate function.
            $this->login_alt();
        }
    }

    /**
     * Overrides the Log-in of the current user -- for use locally.
     */
    public function login_alt() {
        // Check if logged in.
        if ($this->loggedIn()) {
            $this->logout();
        }

        if (!$this->user) {
            throw new \Exception('Tried to login without a user.');
        }

        // SET PATH
        $this->getSession()->visit($this->locatePath($this->path));

        $element = $this->getSession()->getPage();
        $element->fillField($this->getDrupalText('username_field'), $this->user->name);
        $element->fillField($this->getDrupalText('password_field'), $this->user->pass);
        $submit = $element->findButton($this->getDrupalText('log_in'));
        if (empty($submit)) {
            throw new \Exception(sprintf("No submit button at %s", $this->getSession()->getCurrentUrl()));
        }

        // Log in.
        $submit->click();

        if (!$this->loggedIn()) {
            if (isset($this->user->role)) {
                throw new \Exception(sprintf("Unable to determine if logged in because 'log_out' link cannot be found for user '%s' with role '%s'", $this->user->name, $this->user->role));
            }
            else {
                throw new \Exception(sprintf("Unable to determine if logged in because 'log_out' link cannot be found for user '%s'", $this->user->name));
            }
        }
    }



}
