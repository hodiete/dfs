<?php

namespace Drupal\Tests\PHPUnit;

/**
 * Class GitTest.
 *
 * Verifies that git related tasks work as expected.
 */
class GitTest extends TestBase {

  /**
   * Tests Phing setup:git-hooks target.
   */
  public function testGitConfig() {
    $this->assertFileExists($this->projectDirectory . '/.git');
    $this->assertFileExists($this->projectDirectory . '/.git/hooks/commit-msg');
    $this->assertFileExists($this->projectDirectory . '/.git/hooks/pre-commit');
    $this->assertNotContains(
        '${project.prefix}',
        file_get_contents($this->projectDirectory . '/.git/hooks/commit-msg')
    );
  }

  /**
   * Tests operation of scripts/git-hooks/commit-msg.
   *
   * @param bool $is_valid
   *   Whether the message is valid.
   * @param string $commit_message
   *   The git commit message.
   * @param string $message
   *   The PHPUnit message to be output for this datapoint.
   *
   * @dataProvider providerTestGitHookCommitMsg
   */
  public function testGitHookCommitMsg($is_valid, $commit_message, $message = NULL) {
    $this->assertCommitMessageValidity($is_valid, $commit_message, $message);
  }

  /**
   * Data provider.
   */
  public function providerTestGitHookCommitMsg() {
    $prefix = $this->config['project']['prefix'];
    return [
        [FALSE, "This is a bad commit.",
          'Missing prefix and ticket number.',
        ],
        [FALSE, "123: This is a bad commit.",
          'Missing project prefix.',
        ],
        [FALSE, "{$prefix}: This is a bad commit.",
          'Missing ticket number.',
        ],
        [FALSE, "{$prefix}-123 This is a bad commit.", 'Missing colon.'],
        [FALSE, "{$prefix}-123: This is a bad commit", 'Missing period.'],
        [FALSE, "{$prefix}-123: Hello.", 'Too short.'],
        [FALSE, "NOT-123: This is a bad commit.", 'Wrong project prefix.'],
        [TRUE, "{$prefix}-123: This is a good commit.", 'Good commit.'],
        [TRUE, "{$prefix}-123: This is an exceptionally long--seriously, really, really, REALLY long, but still good commit.", 'Long good commit.',
        ],
    ];
  }

  /**
   * Asserts that a given commit message is valid or not.
   *
   * @param bool $is_valid
   *   Whether the message is valid.
   * @param string $commit_message
   *   The git commit message.
   * @param string $message
   *   The PHPUnit message to be output for this datapoint.
   */
  protected function assertCommitMessageValidity($is_valid, $commit_message, $message = '') {
    // Commits must be executed inside of new project directory.
    chdir($this->projectDirectory);

    // "2>&1" redirects standard error output to standard output.
    $command = "mkdir -p {$this->projectDirectory}/tmp && echo '$commit_message' > {$this->projectDirectory}/tmp/blt_commit_msg && {$this->projectDirectory}/.git/hooks/commit-msg {$this->projectDirectory}/tmp/blt_commit_msg 2>&1";
    print "Executing \"$command\" \n";

    exec($command, $output, $return);
    $this->assertNotSame($is_valid, (bool) $return, $message);
  }

}
