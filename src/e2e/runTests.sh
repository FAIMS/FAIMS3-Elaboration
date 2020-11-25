#!/usr/bin/env -S bash -l

repo_root_dir="$(git rev-parse --show-toplevel)"
cd "$repo_root_dir"
for file in $(find "$repo_root_dir/src/e2e/" -name "*.ts");do
	echo "converting $file"
	npm run tsc "$file"
done

for file in $(find "$repo_root_dir/src/e2e/" -name "*.js"); do
	echo "Running $file"
	node "$file"
done