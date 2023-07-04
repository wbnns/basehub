# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "basehub"
  spec.version       = "0.1.0"
  spec.authors       = ["Will Binns"]
  spec.email         = ["hello@wbnns.com"]

  spec.summary       = %q{Get started and learn more about using Base}
  spec.homepage      = "https://github.com/basefoss/basehub"
  spec.license       = "MIT"
  spec.metadata      = {
    "bug_tracker_uri"   => "https://github.com/basefoss/basehub/issues",
    "changelog_uri"     => "https://github.com/basefoss/basehub/blob/main/CHANGELOG.md",
    "documentation_uri" => "https://basehub.org/",
    "source_code_uri"   => "https://github.com/basefoss/basehub",
  }

  spec.files         = `git ls-files -z ':!:*.jpg' ':!:*.png'`.split("\x0").select { |f| f.match(%r{^(assets|bin|_layouts|_includes|lib|Rakefile|_sass|LICENSE|README|CHANGELOG|favicon)}i) }
  spec.executables   << 'basehub'

  spec.add_development_dependency "bundler", ">= 2.3.5"
  spec.add_runtime_dependency "jekyll", ">= 3.8.5"
  spec.add_runtime_dependency "jekyll-seo-tag", ">= 2.0"
  spec.add_runtime_dependency "rake", ">= 12.3.1"
end
